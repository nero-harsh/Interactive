
import React, { ReactNode } from 'react';

// ========== ICONS (Quirky, hand-drawn style) ==========
export const Icons = {
  cart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993l-1.263 12A1.125 1.125 0 0 1 17.25 21H6.75a1.125 1.125 0 0 1-1.119-1.243l-1.263-12A1.125 1.125 0 0 1 5.487 8.5h13.027a1.125 1.125 0 0 1 1.119 1.007Z" />
    </svg>
  ),
  user: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  close: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.343 6.343l11.314 11.314M17.657 6.343L6.343 17.657" />
    </svg>
  ),
  google: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.012,35.816,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
  ),
  plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
  ),
  minus: (props: React.SVGProps<SVGSVGElement>) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
  ),
  trash: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
  ),
  jar: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75,3.75h4.5a1.5,1.5,0,0,1,1.5,1.5v0.75H8.25V5.25A1.5,1.5,0,0,1,9.75,3.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6,6.75A2.25,2.25,0,0,1,8.25,4.5h7.5A2.25,2.25,0,0,1,18,6.75V19.5A2.25,2.25,0,0,1,15.75,21.75H8.25A2.25,2.25,0,0,1,6,19.5Z" />
        <line x1="6" y1="9" x2="18" y2="9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  ),
  chilli: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.62,4.21a3.4,3.4,0,0,1,4.17,4.17C17.61,16.5,9.26,19.33,9.26,19.33s-2-4.88,1.21-11.4A3.4,3.4,0,0,1,14.62,4.21Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.83,5a2.5,2.5,0,0,1,2.17-2.17" />
    </svg>
  ),
  garlic: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25,5.25a6,6,0,0,1,6,6c0,4.5-3.75,7.5-6,7.5S5.25,15.75,5.25,11.25,7.5,5.25,11.25,5.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25,5.25a.75.75,0,0,0-1.5,0v-.75a2.25,2.25,0,1,1,4.5,0v.75a.75.75,0,0,0-1.5,0" transform="rotate(-30 11.25 5.25)" />
    </svg>
  ),
};

// ========== BUTTON ==========
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
}
export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-8 py-3 font-sans font-bold text-base rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    primary: 'bg-brand-maroon text-brand-cream hover:bg-brand-maroon/90 hover:-translate-y-0.5',
    secondary: 'bg-brand-gold text-brand-dark hover:bg-brand-gold/90 hover:-translate-y-0.5',
    outline: 'bg-transparent border-2 border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-brand-cream',
  };
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ========== SPINNER ==========
export const Spinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-brand-maroon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


// ========== MODAL ==========
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-brand-dark bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-brand-cream rounded-3xl shadow-2xl w-full max-w-md mx-auto relative transform transition-transform duration-300 scale-95" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-brand-gold/30">
          <h2 className="font-serif text-3xl text-brand-maroon">{title}</h2>
          <button onClick={onClose} className="text-brand-maroon hover:text-brand-gold transition-colors p-2 rounded-full hover:bg-brand-maroon/10">
            <Icons.close className="w-7 h-7"/>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};


// ========== INPUT ==========
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    (props, ref) => (
        <input 
            ref={ref}
            {...props}
            className={`w-full px-5 py-3 bg-white border-2 border-brand-gold/50 rounded-full font-sans text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-200 ${props.className || ''}`}
        />
    )
);
Input.displayName = 'Input';


// ========== STAR RATING ==========
interface StarRatingProps {
  rating: 1 | 2 | 3 | 4 | 5;
}
export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-5 h-5 ${i < rating ? 'text-brand-gold' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};