
import React, { useState, useCallback, useMemo, createContext, useContext, ReactNode } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { User, AuthContextType, CartContextType, CartItem, Product } from './types';
import { PICKLE_PRODUCTS, NAV_LINKS } from './constants';
import { Button, Icons, Input, Modal, Spinner, StarRating } from './components/ui';

// CONTEXTS
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const CartContext = createContext<CartContextType | undefined>(undefined);

// HOOKS
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// PROVIDERS
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ name: '', isLoggedIn: false });
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const login = useCallback((name: string) => {
    setUser({ name, isLoggedIn: true });
    setIsLoginVisible(false);
  }, []);

  const logout = useCallback(() => {
    setUser({ name: '', isLoggedIn: false });
  }, []);

  const showLogin = useCallback(() => setIsLoginVisible(true), []);
  const hideLogin = useCallback(() => setIsLoginVisible(false), []);

  const value = useMemo(() => ({ user, login, logout, showLogin, hideLogin, isLoginVisible }), [user, login, logout, showLogin, hideLogin, isLoginVisible]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const showCart = useCallback(() => setIsCartVisible(true), []);
  const hideCart = useCallback(() => setIsCartVisible(false), []);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showCart();
  }, [showCart]);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.id === productId ? { ...item, quantity } : item))
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartVisible, showCart, hideCart }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartVisible, showCart, hideCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// =================================================================================
// SUB-COMPONENTS
// =================================================================================

const Header: React.FC = () => {
    const { user, showLogin, logout } = useAuth();
    const { totalItems, showCart } = useCart();

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl bg-brand-cream/80 backdrop-blur-lg z-40 shadow-lg rounded-full">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <NavLink to="/" className="font-serif text-2xl md:text-3xl font-bold text-brand-maroon tracking-wider">
                    Nostalgia Jars
                </NavLink>
                <nav className="hidden md:flex items-center space-x-8">
                    {NAV_LINKS.map(link => (
                        <NavLink key={link.name} to={link.path} className={({ isActive }) =>
                            `font-sans font-semibold text-brand-maroon hover:text-brand-gold transition-colors duration-300 ${isActive ? 'text-brand-gold' : ''}`
                        }>
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    <button onClick={showCart} className="relative text-brand-maroon hover:text-brand-gold transition-colors">
                        <Icons.cart className="w-8 h-8" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                                {totalItems}
                            </span>
                        )}
                    </button>
                    {user.isLoggedIn ? (
                        <div className="relative group">
                            <button className="flex items-center space-x-2 text-brand-maroon hover:text-brand-gold transition-colors">
                                <Icons.user className="w-8 h-8" />
                            </button>
                             <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg py-2 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-95 origin-top-right">
                                <div className="px-4 py-2 border-b border-gray-200">
                                    <p className="text-sm text-gray-500">Signed in as</p>
                                    <p className="font-semibold text-brand-dark truncate">{user.name}</p>
                                </div>
                                <NavLink to="/profile" className="block px-4 py-2 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-maroon transition-colors rounded-lg m-1">Profile</NavLink>
                                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-maroon transition-colors rounded-lg m-1">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={showLogin} className="text-brand-maroon hover:text-brand-gold transition-colors">
                            <Icons.user className="w-8 h-8" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};


const LoginModal: React.FC = () => {
    const { isLoginVisible, hideLogin, login } = useAuth();
    const [mode, setMode] = useState<'otp' | 'google'>('otp');
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');

    const handleOtpLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2); // Simulate sending OTP
        } else {
            // Simulate OTP verification
            if (otp.length === 6) {
                login("Pickle Lover");
                resetState();
            } else {
                alert("Please enter a 6-digit OTP.");
            }
        }
    };

    const handleGoogleLogin = () => {
        // DEV NOTE: This is a simulation. For a real application,
        // you would use the Google Identity Services library (gsi)
        // to initiate the OAuth flow and get a token, which would
        // be verified on your backend.
        login("Achar Fan");
        resetState();
    };

    const resetState = () => {
        setStep(1);
        setPhone('');
        setOtp('');
    };

    const handleClose = () => {
        resetState();
        hideLogin();
    };

    return (
        <Modal isOpen={isLoginVisible} onClose={handleClose} title="Welcome Back">
            <div className="space-y-6">
                <div className="flex border-b-2 border-brand-gold/20">
                    <button onClick={() => setMode('otp')} className={`flex-1 p-3 font-serif text-lg ${mode === 'otp' ? 'text-brand-maroon border-b-2 border-brand-maroon' : 'text-gray-500'}`}>
                        Login with OTP
                    </button>
                    <button onClick={() => setMode('google')} className={`flex-1 p-3 font-serif text-lg ${mode === 'google' ? 'text-brand-maroon border-b-2 border-brand-maroon' : 'text-gray-500'}`}>
                        Sign In
                    </button>
                </div>

                {mode === 'otp' ? (
                    <form onSubmit={handleOtpLogin} className="space-y-4">
                        {step === 1 && (
                            <>
                                <p className="text-center font-sans text-brand-maroon/80">Enter your mobile number to receive a One-Time Password.</p>
                                <Input type="tel" placeholder="Your 10-digit mobile number" value={phone} onChange={e => setPhone(e.target.value)} required pattern="\d{10}" />
                                <Button type="submit" className="w-full">Get OTP</Button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <p className="text-center font-sans text-brand-maroon/80">An OTP has been sent to {phone}.</p>
                                <Input type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} required pattern="\d{6}" />
                                <Button type="submit" className="w-full">Verify & Login</Button>
                                <button onClick={() => setStep(1)} type="button" className="text-sm text-center w-full mt-2 text-brand-maroon hover:underline">Change number</button>
                            </>
                        )}
                    </form>
                ) : (
                    <div className="text-center space-y-4 pt-4">
                        <p className="font-sans text-brand-maroon/80">Sign in with your Google account for a seamless experience.</p>
                        <Button onClick={handleGoogleLogin} variant="outline" className="w-full flex items-center justify-center space-x-2">
                           <Icons.google className="w-6 h-6" />
                           <span>Sign In with Google</span>
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

const Footer: React.FC = () => (
    <footer id="connect" className="bg-brand-maroon text-brand-cream mt-16 relative">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -mt-px">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-[80px] w-full">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-brand-cream"></path>
            </svg>
        </div>
        <div className="container mx-auto px-6 pt-24 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                    <h3 className="font-serif text-3xl font-bold text-brand-gold">Nostalgia Jars</h3>
                    <p className="font-sans mt-4 max-w-md">Gifting a story, a shared laugh, a taste of home. We preserve memories in every jar.</p>
                </div>
                <div>
                    <h4 className="font-serif text-xl font-semibold text-brand-gold">Explore</h4>
                    <ul className="mt-4 space-y-2 font-sans">
                        {NAV_LINKS.map(link => (
                            <li key={link.path}><NavLink to={link.path} className="hover:text-brand-gold transition-colors">{link.name}</NavLink></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-serif text-xl font-semibold text-brand-gold">Connect</h4>
                    <p className="font-sans mt-4">Follow us for updates and delicious recipes!</p>
                </div>
            </div>
            <div className="mt-12 border-t border-brand-gold/30 pt-6 text-center font-sans text-sm">
                <p>&copy; {new Date().getFullYear()} Nostalgia Jars. All Rights Reserved. Crafted with passion.</p>
            </div>
        </div>
    </footer>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();
    return (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden group border-2 border-transparent hover:border-brand-gold transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-1.5 rounded-full">
                    <StarRating rating={product.spiceLevel} />
                </div>
            </div>
            <div className="p-6 text-center flex flex-col h-[260px]">
                <h3 className="font-serif text-2xl text-brand-maroon">{product.name}</h3>
                <p className="font-sans text-brand-gold italic mt-1">{product.tagline}</p>
                <p className="font-sans text-sm text-brand-maroon/80 mt-3 flex-grow">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <p className="font-sans text-2xl font-bold text-brand-maroon">₹{product.price}</p>
                    <Button onClick={() => addToCart(product)} variant="secondary" className="text-sm px-6 py-2.5">Add to Cart</Button>
                </div>
            </div>
        </div>
    );
};

// =================================================================================
// PAGES
// =================================================================================

const HomePage: React.FC = () => {
    const [visibleCategory, setVisibleCategory] = useState<'spicy' | 'mild'>('spicy');
    const featuredProducts = PICKLE_PRODUCTS.filter(p => p.category === visibleCategory).slice(0, 3);
    
    const handleConnectClick = () => {
        document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
    <div>
        <section className="relative bg-brand-cream overflow-hidden h-[90vh] min-h-[700px] flex items-center justify-center p-6">
            <Icons.chilli className="absolute top-[15%] left-[10%] w-16 h-16 text-red-400/70 animate-float" style={{ animationDelay: '0s' }}/>
            <Icons.garlic className="absolute top-[25%] right-[12%] w-20 h-20 text-gray-400/70 animate-float" style={{ animationDelay: '1.5s' }}/>
            <Icons.jar className="absolute bottom-[10%] right-[20%] w-24 h-24 text-brand-gold/50 animate-float" style={{ animationDelay: '3s' }}/>
            <Icons.chilli className="absolute bottom-[15%] left-[25%] w-12 h-12 text-red-400/50 animate-float" style={{ transform: 'rotate(90deg)', animationDelay: '4s' }} />
            
            <div className="container mx-auto text-center relative z-10">
                 <div className="relative inline-block">
                    <Icons.jar className="w-32 h-32 md:w-48 md:h-48 text-brand-maroon/10 mx-auto" />
                    <h1 className="absolute inset-0 flex items-center justify-center font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-brand-maroon drop-shadow-sm -mt-2">
                        Taste the Memories
                    </h1>
                </div>
                <p className="font-sans text-lg md:text-2xl mt-6 max-w-3xl mx-auto text-brand-dark/80">
                    Handcrafted Indian pickles, bottled with love and a touch of the past.
                </p>
                <NavLink to="/flavours">
                  <Button variant="secondary" className="mt-10 px-12 py-4 text-lg shadow-xl">Explore Flavours</Button>
                </NavLink>
            </div>
        </section>

        <section className="py-20 bg-brand-cream/50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon">Gift a Jar of Memories</h2>
                <p className="font-sans text-lg text-brand-maroon/80 mt-4 max-w-2xl mx-auto">Move beyond the ordinary. Gifting a jar of Nostalgia is gifting a story, a shared laugh, a taste of home. It's the most delicious way to say you care.</p>
                <Button onClick={handleConnectClick} variant="outline" className="mt-8">Connect With Us</Button>
            </div>
        </section>

        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon text-center mb-6">From Our Kitchen to Yours</h2>
                <div className="flex justify-center mb-12">
                    <div className="flex justify-center items-center bg-brand-cream p-1.5 rounded-full border-2 border-brand-gold/20 space-x-2">
                        <button onClick={() => setVisibleCategory('spicy')} className={`px-6 py-2 rounded-full font-serif text-lg transition-all duration-300 ${visibleCategory === 'spicy' ? 'bg-brand-maroon text-brand-cream shadow-md' : 'text-brand-maroon/70 hover:bg-brand-maroon/10'}`}>
                            Fiery Delights
                        </button>
                        <button onClick={() => setVisibleCategory('mild')} className={`px-6 py-2 rounded-full font-serif text-lg transition-all duration-300 ${visibleCategory === 'mild' ? 'bg-brand-maroon text-brand-cream shadow-md' : 'text-brand-maroon/70 hover:bg-brand-maroon/10'}`}>
                            Mild Treasures
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </div>
        </section>
    </div>
)};

const ProductsPage: React.FC = () => {
    const spicyPickles = PICKLE_PRODUCTS.filter(p => p.category === 'spicy');
    const mildPickles = PICKLE_PRODUCTS.filter(p => p.category === 'mild');

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="font-serif text-5xl text-brand-maroon mb-4">Our Handcrafted Collection</h1>
                <p className="font-sans text-xl text-brand-maroon/80">Every jar is a masterpiece of flavour and memory, lovingly sorted for your palate.</p>
            </div>

            <section id="fiery-delights">
                <h2 className="font-serif text-4xl text-brand-maroon border-b-2 border-brand-gold pb-3 mb-8">Fiery Delights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {spicyPickles.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>
            
            <section id="mild-treasures" className="mt-20">
                <h2 className="font-serif text-4xl text-brand-maroon border-b-2 border-brand-gold pb-3 mb-8">Mild Treasures</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {mildPickles.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>
        </div>
    );
};

const CartPage: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    if (totalItems === 0) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <Icons.cart className="w-24 h-24 mx-auto text-brand-gold/50" />
                <h1 className="font-serif text-4xl text-brand-maroon mt-6">Your Basket is Empty</h1>
                <p className="font-sans text-lg text-brand-maroon/80 mt-2">Looks like you haven't added any delicacies yet.</p>
                <NavLink to="/products">
                    <Button variant="primary" className="mt-8">Browse Pickles</Button>
                </NavLink>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-6 py-16">
            <h1 className="font-serif text-5xl text-center text-brand-maroon mb-12">Your Basket of Memories</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {cart.map(item => (
                        <div key={item.id} className="flex items-center bg-white p-4 rounded-3xl shadow-md">
                            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-2xl" />
                            <div className="flex-grow ml-4">
                                <h3 className="font-serif text-2xl text-brand-maroon">{item.name}</h3>
                                <p className="font-sans text-brand-maroon/80">₹{item.price}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 rounded-full bg-brand-cream hover:bg-brand-gold/20 transition"><Icons.minus className="w-5 h-5 text-brand-maroon" /></button>
                                <span className="font-sans font-bold text-lg w-8 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 rounded-full bg-brand-cream hover:bg-brand-gold/20 transition"><Icons.plus className="w-5 h-5 text-brand-maroon" /></button>
                            </div>
                            <p className="font-sans text-xl font-bold text-brand-maroon w-24 text-right">₹{item.price * item.quantity}</p>
                            <button onClick={() => removeFromCart(item.id)} className="ml-6 text-red-400 hover:text-red-600 transition"><Icons.trash className="w-6 h-6" /></button>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-3xl shadow-md sticky top-28">
                        <h2 className="font-serif text-3xl text-brand-maroon border-b-2 border-brand-gold/30 pb-4">Order Summary</h2>
                        <div className="space-y-4 my-6 font-sans">
                            <div className="flex justify-between text-lg"><span className="text-brand-maroon/80">Subtotal ({totalItems} items)</span> <span className="font-semibold text-brand-maroon">₹{totalPrice}</span></div>
                            <div className="flex justify-between text-lg"><span className="text-brand-maroon/80">Shipping</span> <span className="font-semibold text-brand-maroon">FREE</span></div>
                        </div>
                        <div className="flex justify-between font-bold text-2xl pt-4 border-t-2 border-brand-gold/30">
                            <span className="font-serif text-brand-maroon">Total</span>
                            <span className="font-sans text-brand-maroon">₹{totalPrice}</span>
                        </div>
                        <Button className="w-full mt-8">Proceed to Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StoryPage: React.FC = () => (
    <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl text-center text-brand-maroon mb-8">Our Story</h1>
            <img src="https://picsum.photos/seed/story/800/400" alt="Our artisan kitchen" className="rounded-3xl shadow-xl mb-8" />
            <div className="font-sans text-lg text-brand-maroon/90 space-y-6 leading-relaxed bg-white/50 p-8 rounded-2xl">
                <p>Nostalgia Jars was born not in a factory, but from a treasured family recipe book, its pages yellowed with age and fragrant with the scent of sun-dried mangoes and freshly ground spices. Passed down through generations, these recipes were the secret keepers of our family's culinary legacy.</p>
                <p>We believe that a pickle is not merely a condiment; it's a story, a memory, a burst of flavour that can transport you to a sunlit afternoon in your grandmother's kitchen. Each jar we craft is a tribute to her, who taught us that the finest ingredients, a patient hand, and a whole lot of love are the true secrets to a perfect pickle.</p>
                <p>Today, we bring these comforting tastes to you, using the same time-honoured techniques and ethically sourced, seasonal produce. From our family to yours, we invite you to open a jar and taste the memories.</p>
                <p className="font-semibold italic text-brand-maroon pt-4 border-t border-brand-gold/30">Our greatest joy comes from knowing that these jars travel beyond our kitchen, finding their way into your homes and your celebrations. When you gift a Nostalgia Jar, you're not just giving a pickle; you're sharing a piece of our story and creating new memories of your own. It's a tradition we're honored to share with you.</p>
            </div>
        </div>
    </div>
);

const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    if (!user.isLoggedIn) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <h1 className="font-serif text-4xl text-brand-maroon mt-6">Please Log In</h1>
                <p className="font-sans text-lg text-brand-maroon/80 mt-2">You need to be logged in to view your profile.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
                <h1 className="font-serif text-5xl text-center text-brand-maroon mb-8">My Profile</h1>
                <div className="text-center">
                    <p className="font-sans text-xl">Welcome, <span className="font-bold text-brand-maroon">{user.name}</span>!</p>
                    <p className="font-sans text-md text-brand-maroon/80 mt-2">More profile features coming soon!</p>
                </div>
            </div>
        </div>
    )
}

const FlavoursPage: React.FC = () => {
    type Stage = 'question1' | 'question2' | 'result';
    const [stage, setStage] = useState<Stage>('question1');
    const [answers, setAnswers] = useState<{ heat?: string; mood?: string }>({});
    const [recommendation, setRecommendation] = useState<Product | null>(null);

    const handleAnswer = (question: 'heat' | 'mood', answer: string) => {
        const newAnswers = { ...answers, [question]: answer };
        setAnswers(newAnswers);

        if (question === 'heat') {
            setStage('question2');
        } else {
            // Determine recommendation
            let resultId;
            if (newAnswers.heat === 'spicy') {
                resultId = newAnswers.mood === 'bold' ? 3 : 2; // Fiery Garlic or Chicken
            } else { // mild
                resultId = newAnswers.mood === 'tangy' ? 5 : 4; // Lemon or Heirloom Garlic
            }
            const foundPickle = PICKLE_PRODUCTS.find(p => p.id === resultId);
            setRecommendation(foundPickle || PICKLE_PRODUCTS[0]);
            setStage('result');
        }
    };
    
    const resetQuiz = () => {
      setStage('question1');
      setAnswers({});
      setRecommendation(null);
    }

    const QuizCard: React.FC<{title:string, children:ReactNode}> = ({title, children}) => (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-2xl text-center">
            <h2 className="font-serif text-4xl text-brand-maroon mb-8">{title}</h2>
            {children}
        </div>
    )

    return (
        <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[60vh]">
            {stage === 'question1' && (
                <QuizCard title="How much heat can you handle?">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Button variant="outline" className="h-24 text-lg" onClick={() => handleAnswer('heat', 'spicy')}>Bring on the Fire!</Button>
                        <Button variant="outline" className="h-24 text-lg" onClick={() => handleAnswer('heat', 'mild')}>A Gentle Warmth</Button>
                    </div>
                </QuizCard>
            )}
            {stage === 'question2' && (
                 <QuizCard title="What's your flavour mood?">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Button variant="outline" className="h-24 text-lg" onClick={() => handleAnswer('mood', 'bold')}>Bold & Pungent</Button>
                        <Button variant="outline" className="h-24 text-lg" onClick={() => handleAnswer('mood', 'tangy')}>Tangy & Refreshing</Button>
                    </div>
                </QuizCard>
            )}
             {stage === 'result' && recommendation && (
                 <QuizCard title="Your Pickle Personality Is...">
                    <div className="flex flex-col items-center">
                       <p className="font-sans text-xl text-brand-maroon/80 mb-8">We think you'll fall in love with this one.</p>
                       <div className="w-full max-w-sm">
                        <ProductCard product={recommendation} />
                       </div>
                       <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
                           <Button onClick={resetQuiz} variant="outline">Take Quiz Again</Button>
                           <NavLink to="/products">
                                <Button variant="secondary">See All Pickles</Button>
                           </NavLink>
                       </div>
                    </div>
                </QuizCard>
            )}
        </div>
    );
};


const CartSidebar: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, isCartVisible, hideCart } = useCart();

    return (
        <>
            <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 ${isCartVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={hideCart}></div>
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-cream shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isCartVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-6 border-b border-brand-gold/30">
                        <h2 className="font-serif text-3xl text-brand-maroon">Your Basket</h2>
                        <button onClick={hideCart} className="text-brand-maroon hover:text-brand-gold transition-colors p-2 rounded-full hover:bg-brand-maroon/10">
                            <Icons.close className="w-8 h-8"/>
                        </button>
                    </div>
                    {totalItems === 0 ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                            <Icons.cart className="w-20 h-20 text-brand-gold/50 mb-4" />
                            <h3 className="font-serif text-2xl text-brand-maroon">Your basket is empty</h3>
                            <p className="font-sans text-brand-maroon/80 mt-2">Fill it with some deliciousness!</p>
                            <Button onClick={hideCart} variant="secondary" className="mt-6">Keep Shopping</Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex-grow p-6 space-y-4 overflow-y-auto">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center bg-white p-3 rounded-2xl shadow-sm">
                                        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                                        <div className="flex-grow mx-3">
                                            <h3 className="font-serif text-xl text-brand-maroon leading-tight">{item.name}</h3>
                                            <p className="font-sans text-brand-maroon/80 text-sm">₹{item.price}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 rounded-full bg-brand-cream hover:bg-brand-gold/20 transition"><Icons.minus className="w-4 h-4 text-brand-maroon" /></button>
                                            <span className="font-sans font-bold text-md w-6 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 rounded-full bg-brand-cream hover:bg-brand-gold/20 transition"><Icons.plus className="w-4 h-4 text-brand-maroon" /></button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="ml-3 text-red-400 hover:text-red-600 transition p-1"><Icons.trash className="w-5 h-5" /></button>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 border-t border-brand-gold/30">
                                <div className="flex justify-between font-bold text-xl mb-4">
                                    <span className="font-serif text-brand-maroon">Subtotal</span>
                                    <span className="font-sans text-brand-maroon">₹{totalPrice}</span>
                                </div>
                                <NavLink to="/cart" onClick={hideCart}>
                                    <Button className="w-full">View Cart & Checkout</Button>
                                </NavLink>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

// =================================================================================
// MAIN APP COMPONENT
// =================================================================================

function App() {
  return (
    <AuthProvider>
        <CartProvider>
            <HashRouter>
                <div className="bg-brand-cream font-sans text-brand-dark min-h-screen flex flex-col">
                    <Header />
                    <LoginModal />
                    <CartSidebar />
                    <main className="flex-grow pt-28">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/flavours" element={<FlavoursPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/story" element={<StoryPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="*" element={<HomePage />} /> {/* Fallback to home */}
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </HashRouter>
        </CartProvider>
    </AuthProvider>
  );
}

export default App;