

const App = () => {
  return (
    <div className="h-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-[#f7f5fa] dark:bg-slate-800 rounded-2xl p-8 sm:p-12 lg:py-0 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden shadow-sm">
        
        <div className="flex-1 max-w-xl text-center lg:text-left py-6 lg:py-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Download Mobile App For <br className="hidden sm:inline" /> Better Experience
          </h2>
          
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <a 
              href="#google-play" 
              className="inline-flex items-center gap-3 bg-black hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl transition duration-200 border border-slate-800"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.5,12.16L17.87,13L16.92,12.16L17.87,11.33M3.5,4.15L16.55,11.13L3.5,18.1V4.15Z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium font-sans">GET IT ON</p>
                <p className="text-sm font-semibold font-sans -mt-0.5">Google Play</p>
              </div>
            </a>

            <a 
              href="#app-store" 
              className="inline-flex items-center gap-3 bg-black hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl transition duration-200 border border-slate-800"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-medium font-sans">Download on the</p>
                <p className="text-sm font-semibold font-sans -mt-0.5">App Store</p>
              </div>
            </a>
          </div>
        </div>

        <div className="flex-1 self-end flex justify-center lg:justify-end h-64 sm:h-80 lg:h-[340px] relative mt-4 lg:mt-0">
          <img 
            src="https://i.ibb.co/R4zkZ0Xz/girl.png" 
            alt="App Presentation" 
            className="h-full w-auto object-contain object-bottom select-none pointer-events-none transform scale-110 origin-bottom"
          />
        </div>

      </div>
    </div>
  );
};

export default App;