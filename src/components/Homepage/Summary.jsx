import { ImRocket } from 'react-icons/im';
import { stats } from '../../utils/stats';
import { Stat } from '../shared/Stat';

export const Summary = () => {
  return (
    <div className="max-w-[1024px] mx-auto ">
      <div className="flex justify-center items-center">
        <h2 className="text-center font-bold text-neutral text-3xl">Our Business keeps growing</h2>
        <i>
          <ImRocket className="text-primary hidden lg:block text-3xl font-bold ml-3" />
        </i>
      </div>
      <div className="py-10">
        <section className="stats stats-vertical lg:stats-horizontal shadow w-full">
          {stats.map((stat, i) => (
            <Stat
              key={i}
              title={stat.title}
              tickerValue={stat.tickerValue}
              tickerSuffix={stat.tickerSuffix}
              desc={stat.desc}
              icon={stat.icon}
              color={stat.color}
              decimals={stat.decimals}
            />
          ))}
        </section>
      </div>
    </div>
  );
};
