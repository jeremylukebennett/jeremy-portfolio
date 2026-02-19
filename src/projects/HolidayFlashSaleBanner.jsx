import { useEffect, useState } from 'react'

function getCountdownTarget() {
  const now = new Date()
  const year = now.getFullYear()
  const thisYearTarget = new Date(`${year}-12-11T00:00:00`)
  return now > thisYearTarget ? new Date(`${year + 1}-12-11T00:00:00`) : thisYearTarget
}

function getTimeLeft(targetDate) {
  const now = Date.now()
  const distance = targetDate.getTime() - now

  if (distance <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const day = 1000 * 60 * 60 * 24
  const hour = 1000 * 60 * 60
  const minute = 1000 * 60
  const second = 1000

  return {
    expired: false,
    days: Math.floor(distance / day),
    hours: Math.floor((distance % day) / hour),
    minutes: Math.floor((distance % hour) / minute),
    seconds: Math.floor((distance % minute) / second),
  }
}

function HolidayFlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(getCountdownTarget()))

  useEffect(() => {
    const targetDate = getCountdownTarget()
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 250)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="p-2 md:p-4">
      <div
        className="relative mx-auto grid min-h-[320px] w-full max-w-[1280px] items-center overflow-hidden border-2 border-white/50 px-4 py-5 text-white md:min-h-[460px] md:px-8 md:py-9"
        style={{
          backgroundColor: '#ff9000',
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0229/7157/files/gabb_orange_background.jpg?v=1701811294')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/10" />

        <div className="relative z-10 w-full max-w-[760px]">
          <p
            className="m-0 text-center font-semibold leading-[0.98] tracking-[0.04em] md:text-left"
            style={{ fontSize: 'clamp(24px, 5.2vw, 56px)' }}
          >
            HOLIDAY FLASH SALE
          </p>
          <p
            className="m-0 text-center font-semibold leading-[0.98] tracking-[0.04em] md:text-left"
            style={{ fontSize: 'clamp(68px, 15vw, 168px)', marginTop: 'clamp(-8px, -0.8vw, -12px)' }}
          >
            10% OFF
          </p>
          <p
            className="m-0 text-center font-semibold leading-[0.98] tracking-[0.04em] md:text-left"
            style={{ fontSize: 'clamp(38px, 8.6vw, 94px)', marginTop: 'clamp(-12px, -1vw, -16px)' }}
          >
            EVERYTHING
          </p>
          <p
            className="m-0 text-center font-semibold leading-[0.98] tracking-[0.04em] md:text-left"
            style={{ fontSize: 'clamp(25px, 5.3vw, 58px)', marginTop: 'clamp(6px, 0.8vw, 14px)' }}
          >
            THIS WEEK ONLY
          </p>

          {timeLeft.expired ? (
            <p className="mt-4 text-center text-2xl font-semibold tracking-[0.02em] md:text-left md:text-4xl">
              Offer Ended
            </p>
          ) : (
            <ul className="mt-4 grid grid-cols-4 gap-2 p-0 md:max-w-[560px] md:gap-3">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Min', value: timeLeft.minutes },
                { label: 'Sec', value: timeLeft.seconds },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex min-h-[82px] list-none flex-col items-center justify-center border border-white/45 bg-black/20 text-[11px] tracking-[0.03em] md:min-h-[108px] md:items-start md:pl-3 md:text-[15px]"
                >
                  <span className="text-[24px] leading-none md:text-[42px]">{item.value}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default HolidayFlashSaleBanner
