
import React, { useState, useMemo } from 'react';
import { ShoppingCart, Plus, Search, X, CheckCircle, CreditCard, Banknote, ArrowRight, Minus, Trash2 } from 'lucide-react';
import { Product, CartItem } from '../types';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Small Refresh',
    size: '200ml',
    price: 10,
    image: 'https://images.unsplash.com/photo-1551046710-23b9d6205763?auto=format&fit=crop&q=80&w=600',
    description: 'Refreshing Trilokneer water in a convenient size for guests.'
  },
  {
    id: '2',
    name: 'Standard Active',
    size: '500ml',
    price: 20,
    image: 'https://images.unsplash.com/photo-1616118132534-381183d38b3f?auto=format&fit=crop&q=80&w=600',
    description: 'The standard choice for personal hydration with our signature red label.'
  },
  {
    id: '3',
    name: 'Premium Daily',
    size: '1L',
    price: 35,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=600',
    description: 'Full-liter bottle featuring our "shuddh pani" quality assurance.'
  },
  {
    id: '4',
    name: 'Event Pack',
    size: '200ml x 24',
    price: 220,
    image: 'https://images.unsplash.com/photo-1559839914-17aae19cea71?auto=format&fit=crop&q=80&w=600',
    description: 'Bulk supply for large gatherings with full brand certification.'
  }
];

const BrandedLabel: React.FC = () => (
  <div className="absolute inset-x-0 bottom-[20%] flex flex-col items-center pointer-events-none">
    <div className="w-[85%] bg-[#E1261C] py-2 px-1 shadow-xl relative overflow-hidden border-y border-white/20">
      {/* Label Content */}
      <div className="flex items-center justify-between px-2 gap-1">
        {/* Blue Drop Logo */}
        <div className="w-5 h-7 bg-blue-500 rounded-t-full rounded-b-2xl relative flex items-center justify-center shadow-inner">
           <span className="text-white text-[6px] font-bold border border-white/50 rounded-full w-3 h-3 flex items-center justify-center">R</span>
        </div>
        
        {/* Brand Name */}
        <div className="flex-1 text-center">
          <h4 className="text-white font-black text-[10px] tracking-tighter leading-none">TRILOKNEER</h4>
          <p className="text-white/90 text-[5px] italic leading-none mt-0.5" style={{ fontFamily: 'serif' }}>shuddh pani, swasth jeevan</p>
        </div>
        
        {/* FSSAI Mock */}
        <div className="text-[4px] text-white/60 font-bold leading-[1] text-right">
           FSSAI<br/>VERIFIED
        </div>
      </div>
      
      {/* Texture effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
    </div>
  </div>
);

const Store: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash'>('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.size.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    if (paymentMethod === 'upi') {
      const upiUrl = `upi://pay?pa=bipinmishra@upi&pn=Trilokneer&am=${totalPrice}&cu=INR&tn=Water Order`;
      window.location.href = upiUrl;
    }
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart([]);
      setIsCheckoutOpen(false);
    }, 3000);
  };

  return (
    <div className="p-6 pb-32">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Trilokneer Store</h2>
          <p className="text-gray-500 text-sm italic">Fresh from Jaunpur</p>
        </div>
        <button 
          onClick={() => setIsCheckoutOpen(true)}
          className="relative p-2 bg-white rounded-xl shadow-sm border border-gray-100 active:scale-95 transition-all"
        >
          <ShoppingCart className="text-[#E1261C]" size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#E1261C] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search water bottles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E1261C] transition-all shadow-sm"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <X size={18} className="text-gray-400" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col group animate-in fade-in zoom-in-95 duration-500">
            <div 
              className="aspect-[3/4] relative overflow-hidden bg-gray-50 cursor-zoom-in"
              onClick={() => setZoomedImage(product.image)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
              
              {/* Realistic Branding Overlay */}
              <BrandedLabel />

              <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[8px] font-bold text-white">
                {product.size}
              </div>
            </div>
            
            <div className="p-3 flex flex-col flex-1">
              <h3 className="font-bold text-gray-800 text-xs line-clamp-1">{product.name}</h3>
              <div className="flex justify-between items-center mt-3">
                <span className="text-[#E1261C] font-black text-sm">₹{product.price}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-[#E1261C] text-white p-2 rounded-xl active:scale-90 transition-all shadow-md shadow-red-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setZoomedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            onClick={() => setZoomedImage(null)}
          >
            <X size={24} />
          </button>
          <img 
            src={zoomedImage} 
            className="max-w-full max-h-full rounded-2xl shadow-2xl animate-in zoom-in-90 duration-300" 
            alt="Zoomed product"
          />
        </div>
      )}

      {/* Floating View Cart Bar */}
      {totalItems > 0 && !isCheckoutOpen && (
        <div className="fixed bottom-24 left-6 right-6 max-w-[432px] mx-auto z-40 animate-in slide-in-from-bottom-8 duration-500">
          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-[#E1261C] p-4 rounded-2xl shadow-2xl flex items-center justify-between text-white active:scale-95 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg"><ShoppingCart size={20} /></div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{totalItems} Items</p>
                <p className="text-sm font-black">₹{totalPrice}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 font-black text-xs uppercase tracking-widest">
              Checkout <ArrowRight size={16} />
            </div>
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-end max-w-[480px] mx-auto animate-in fade-in duration-300">
          <div className="bg-white rounded-t-[2.5rem] w-full p-6 animate-in slide-in-from-bottom-20 duration-500 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900 tracking-tighter">Review Order</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-400">
                <X size={20} />
              </button>
            </div>

            {orderPlaced ? (
              <div className="py-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Success!</h3>
                <p className="text-gray-500 mt-2">Redirecting to home...</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl">
                      <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs font-black text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-gray-400"><Minus size={14} /></button>
                        <span className="text-xs font-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-[#E1261C]"><Plus size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Payment</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setPaymentMethod('upi')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'upi' ? 'border-[#E1261C] bg-red-50 text-[#E1261C]' : 'border-gray-100 text-gray-400'}`}>
                      <CreditCard size={24} /><span className="text-[10px] font-black uppercase tracking-tighter">UPI / QR Link</span>
                    </button>
                    <button onClick={() => setPaymentMethod('cash')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'cash' ? 'border-[#E1261C] bg-red-50 text-[#E1261C]' : 'border-gray-100 text-gray-400'}`}>
                      <Banknote size={24} /><span className="text-[10px] font-black uppercase tracking-tighter">Cash on Delivery</span>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-3xl mb-6">
                  <div className="flex justify-between items-center mb-1"><span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Subtotal</span><span className="text-gray-900 font-bold">₹{totalPrice}</span></div>
                  <div className="flex justify-between items-center mb-4"><span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Delivery</span><span className="text-green-500 font-bold">FREE</span></div>
                  <div className="h-px bg-gray-200 mb-4"></div>
                  <div className="flex justify-between items-center"><span className="text-lg font-black text-gray-900 tracking-tighter">Order Total</span><span className="text-2xl font-black text-[#E1261C]">₹{totalPrice}</span></div>
                </div>

                <button onClick={handlePlaceOrder} className="w-full bg-[#E1261C] py-5 rounded-[1.5rem] text-white font-black text-sm tracking-widest uppercase shadow-xl active:scale-95 transition-all">
                  Confirm Order
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
