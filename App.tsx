
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Counter } from './components/Counter';
import { Product, OrderDetails } from './types';
import { PRODUCTS, DELIVERY_FEE, DISCOUNT_CODE, DISCOUNT_PERCENT, BACK_SIDE_FEE, WHATSAPP_NUMBER } from './constants';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    quantity: 1,
    mainEngraving: '',
    engraveBackSide: false,
    backSideEngraving: '',
    discountCode: ''
  });
  const [discountApplied, setDiscountApplied] = useState(false);

  // Sync scroll lock for modal
  useEffect(() => {
    if (selectedProduct || showAbout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProduct, showAbout]);

  const calculateTotal = () => {
    if (!selectedProduct || selectedProduct.isService) return 0;
    const base = selectedProduct.price;
    const extra = orderDetails.engraveBackSide ? BACK_SIDE_FEE : 0;
    const subtotal = (base + extra) * orderDetails.quantity;
    const discount = discountApplied ? (subtotal * DISCOUNT_PERCENT) / 100 : 0;
    return subtotal - discount + DELIVERY_FEE;
  };

  const handleApplyDiscount = () => {
    if (orderDetails.discountCode.toUpperCase() === DISCOUNT_CODE) {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
  };

  const sendOrder = () => {
    if (!selectedProduct) return;

    let message = `Hello 👋 Laser Art LB,\n\nI would like to place an order:\n\n`;
    message += `• Product: ${selectedProduct.name}\n`;
    
    if (selectedProduct.isService) {
      message += `• Inquiry: I'm interested in your ${selectedProduct.name} service. Can you provide more details?`;
    } else {
      const total = calculateTotal();
      message += `• Quantity: ${orderDetails.quantity}\n`;
      message += `• Base Price: $${selectedProduct.price}\n\n`;
      message += `Engraving details:\n`;
      message += `• Main side: ${orderDetails.mainEngraving || "Not specified"}\n`;
      message += `• Other side: ${orderDetails.engraveBackSide ? "Yes (+$3 per item)" : "No"}\n`;
      if (orderDetails.engraveBackSide) {
        message += `• Other side text: ${orderDetails.backSideEngraving || "Not specified"}\n`;
      }
      message += `\nDelivery:\n• All Lebanon – $4\n`;
      if (discountApplied) {
        message += `• Discount code applied: ${DISCOUNT_CODE} (20% OFF)\n`;
      }
      message += `\nTotal amount: $${total.toFixed(2)}\n\nThank you!`;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowAbout(false);
    setOrderDetails({
      quantity: 1,
      mainEngraving: '',
      engraveBackSide: false,
      backSideEngraving: '',
      discountCode: ''
    });
    setDiscountApplied(false);
  };

  return (
    <div className="min-h-screen pb-32">
      <Header onAboutClick={() => setShowAbout(true)} />

      {/* Hero Stats */}
      <section className="max-w-7xl mx-auto px-6 mb-24 animate-reveal stagger-1">
        <Counter target={500} />
      </section>

      {/* Trust Badges - Minimalist */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 mb-32 animate-reveal stagger-2">
        {[
          { label: "Durability", sub: "Premium Stainless" },
          { label: "Precision", sub: "0.01mm Accuracy" },
          { label: "Custom", sub: "Fully Bespoke" },
          { label: "Speed", sub: "2-3 Days Delivery" }
        ].map((feat, i) => (
          <div key={i} className="py-6 px-4 border-l border-white/10 hover:border-white/30 transition-colors">
            <h3 className="text-white font-bold text-xs uppercase tracking-widest">{feat.label}</h3>
            <p className="text-zinc-500 text-[11px] mt-1">{feat.sub}</p>
          </div>
        ))}
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-6 animate-reveal stagger-3">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-black text-white">Curated Collections</h2>
          <div className="h-px flex-1 bg-white/5 mx-8 hidden sm:block"></div>
          <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Est. 2023</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5 transition-all duration-500 group-hover:border-white/20">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider mb-2">
                    {product.isService ? "Service" : "Physical Product"}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:translate-x-1 transition-transform">{product.name}</h3>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-end px-2">
                <div className="flex-1">
                  <p className="text-zinc-500 text-xs truncate pr-4">{product.description}</p>
                </div>
                <div className="text-right">
                   <p className="text-white font-black">
                    {product.isService ? "Custom Quote" : `$${product.price}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Action */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
        target="_blank"
        className="fixed bottom-8 right-8 group z-50"
      >
        <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative flex items-center gap-3 bg-emerald-500 text-black px-6 py-4 rounded-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" className="w-5 h-5" alt="WA" />
          <span className="hidden md:inline">Contact Studio</span>
        </div>
      </a>

      {/* Full Screen Modal */}
      {(selectedProduct || showAbout) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-2xl transition-opacity animate-reveal"
            onClick={closeModal}
          />
          
          <div className="relative w-full h-full sm:h-auto sm:max-w-4xl bg-[#0a0a0a] sm:rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden border-t sm:border border-white/10 animate-reveal flex flex-col sm:max-h-[85vh]">
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white z-50 backdrop-blur-xl border border-white/10 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={showAbout ? 'logo.webp' : selectedProduct?.image} 
                  className="w-full h-full object-cover"
                  alt="Feature"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-1/2 overflow-y-auto custom-scrollbar p-8 md:p-12">
                {showAbout ? (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-4xl font-black mb-2">Our Craft</h2>
                      <div className="w-12 h-1 bg-white rounded-full" />
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Founded with a passion for precision, <strong>Laser Art LB</strong> is a modern studio located in Lebanon. We blend high-tech laser engineering with creative artistry.
                    </p>
                    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5">
                       <p className="text-zinc-300 font-medium italic">
                        "Our mission is to turn ordinary items into timeless keepsakes through the art of laser engraving."
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-white font-bold text-xs uppercase tracking-widest">Connected With</h3>
                      <p className="text-zinc-500 text-sm">
                        Part of the <strong>Artistik Silver Plated</strong> family, bringing decades of craftsmanship experience to every single engraving.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-4xl font-black">{selectedProduct?.name}</h2>
                      </div>
                      <p className="text-zinc-500 text-sm">{selectedProduct?.description}</p>
                    </div>

                    {!selectedProduct?.isService ? (
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Quantity</label>
                            <div className="flex items-center bg-zinc-900 border border-white/10 rounded-2xl px-2">
                               <button 
                                onClick={() => setOrderDetails(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                                className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white"
                               >-</button>
                               <input 
                                type="number" 
                                value={orderDetails.quantity}
                                readOnly
                                className="w-full bg-transparent text-center py-3 text-white font-bold focus:outline-none"
                              />
                              <button 
                                onClick={() => setOrderDetails(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                                className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white"
                               >+</button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Custom Engraving Text</label>
                          <textarea 
                            placeholder="Type the names, dates, or custom text you want engraved..."
                            value={orderDetails.mainEngraving}
                            onChange={(e) => setOrderDetails(prev => ({ ...prev, mainEngraving: e.target.value }))}
                            className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm h-28 resize-none focus:border-white/30 transition-colors"
                          />
                        </div>

                        <div 
                          className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all ${orderDetails.engraveBackSide ? 'bg-white/5 border-white/20' : 'bg-zinc-900 border-white/5'} border`}
                          onClick={() => setOrderDetails(prev => ({ ...prev, engraveBackSide: !prev.engraveBackSide }))}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${orderDetails.engraveBackSide ? 'bg-white border-white' : 'border-zinc-700'}`}>
                            {orderDetails.engraveBackSide && <div className="w-2 h-2 rounded-full bg-black" />}
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-bold text-zinc-200">Engrave back side</span>
                            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mt-0.5">Extra +${BACK_SIDE_FEE}</p>
                          </div>
                        </div>

                        {orderDetails.engraveBackSide && (
                          <div className="animate-reveal">
                             <textarea 
                              placeholder="Back side engraving details..."
                              value={orderDetails.backSideEngraving}
                              onChange={(e) => setOrderDetails(prev => ({ ...prev, backSideEngraving: e.target.value }))}
                              className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm h-20 resize-none"
                            />
                          </div>
                        )}

                        <div className="pt-6 border-t border-white/5">
                           <div className="flex items-center justify-between mb-8">
                             <div>
                               <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Total Price</p>
                               <p className="text-zinc-600 text-[10px] italic">Incl. $4 Delivery (Lebanon)</p>
                             </div>
                             <div className="text-4xl font-black text-white">${calculateTotal().toFixed(2)}</div>
                           </div>

                           <button 
                            onClick={sendOrder}
                            className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-zinc-200 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl"
                          >
                            Proceed to WhatsApp
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          Our industrial laser services are tailored for both individuals and businesses. We work with Stainless Steel, Acrylic, Wood, and more.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5">
                            <p className="text-white font-bold text-xs uppercase">B2B Bulk</p>
                            <p className="text-zinc-500 text-[10px]">Special business rates</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5">
                            <p className="text-white font-bold text-xs uppercase">Express</p>
                            <p className="text-zinc-500 text-[10px]">Same day quote</p>
                          </div>
                        </div>
                        <button 
                          onClick={sendOrder}
                          className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-zinc-200 active:scale-95 transition-all shadow-xl"
                        >
                          Request a Quote
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
