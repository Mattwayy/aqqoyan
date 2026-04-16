const Stats = () => {
  return (
    <div className="w-full py-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="text-center mb-12 md:mb-16 flex flex-col gap-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Форум в цифрах
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#121e52]/80">
            Ключевые результаты  <span className="font-semibold">
            Islamic Finance and Business Forum 2026
          </span>{" "}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {/* Stat 1 */}
           <div className="h-[240px] w-full rounded-2xl shadow-lg transition hover:scale-105 hover:shadow-xl">
             <div className='card card--1'></div>
         </div>
         <div className="h-[240px] w-full rounded-2xl shadow-lg transition hover:scale-105 hover:shadow-xl">
             <div className='card card--2'></div>
         </div>

            <div className="h-[240px] w-full rounded-2xl shadow-lg transition hover:scale-105 hover:shadow-xl">
             <div className='card card--3'></div>
         </div>
               <div className="h-[240px] w-full rounded-2xl shadow-lg transition hover:scale-105 hover:shadow-xl">
             <div className='card card--4'></div>
         </div>

        
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="h-14 px-8 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition">
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
