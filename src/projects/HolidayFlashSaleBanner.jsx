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
    <section className="h-full w-full p-0">
      <div
        className="relative grid h-full min-h-[460px] w-full items-start overflow-hidden border border-white/25 px-3 py-4 text-white md:min-h-[560px] md:px-6 md:py-7"
        style={{
          backgroundColor: '#ff9000',
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0229/7157/files/gabb_orange_background.jpg?v=1701811294')",
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/28 via-black/14 to-black/6" />

        <div className="relative z-10 w-full max-w-[760px]">
          <p
            className="m-0 text-center font-semibold leading-[0.98] tracking-[0.04em] md:text-left"
            style={{ fontSize: 'clamp(21px, 4.8vw, 46px)' }}
          >
            HOLIDAY FLASH SALE
          </p>
          <p
            className="m-0 text-center font-semibold leading-[0.98] tracking-[0.04em] md:text-left"
            style={{ fontSize: 'clamp(56px, 12.8vw, 132px)', marginTop: 'clamp(-8px, -0.8vw, -12px)' }}
          >
            10% OFF
          </p>
          <p
            className="m-0 text-center font-semibold leading-[0.98] tracking-[0.04em] md:text-left"
            style={{ fontSize: 'clamp(33px, 7.2vw, 74px)', marginTop: 'clamp(-10px, -0.9vw, -14px)' }}
          >
            EVERYTHING
          </p>
          <p
            className="m-0 text-center font-semibold leading-[0.98] tracking-[0.04em] md:text-left"
            style={{ fontSize: 'clamp(21px, 4.6vw, 43px)', marginTop: 'clamp(5px, 0.7vw, 11px)' }}
          >
            THIS WEEK ONLY
          </p>

          {timeLeft.expired ? (
            <p className="mt-4 text-center text-2xl font-semibold tracking-[0.02em] md:text-left md:text-4xl">
              Offer Ended
            </p>
          ) : (
            <ul className="mt-4 grid grid-cols-4 gap-2 p-0 md:max-w-[520px] md:gap-3">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Min', value: timeLeft.minutes },
                { label: 'Sec', value: timeLeft.seconds },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex min-h-[72px] list-none flex-col items-center justify-center border border-white/40 bg-black/18 text-[10px] tracking-[0.03em] md:min-h-[96px] md:items-start md:pl-3 md:text-[14px]"
                >
                  <span className="text-[22px] leading-none md:text-[38px]">{item.value}</span>
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
