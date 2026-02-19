import { useEffect, useState } from 'react'
import './HolidayFlashSaleBanner.css'

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
const dayMonth = '12/11/'

function HolidayFlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: '0',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    const getTargetTimestamp = () => {
      const today = new Date()
      const yyyy = today.getFullYear()
      const nextYear = yyyy + 1

      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const dd = String(today.getDate()).padStart(2, '0')
      const todayStr = `${mm}/${dd}/${yyyy}`

      let targetStr = `${dayMonth}${yyyy}`
      if (todayStr > targetStr) {
        targetStr = `${dayMonth}${nextYear}`
      }

      const target = new Date(targetStr).getTime()
      return Number.isFinite(target) ? target : null
    }

    const countDown = getTargetTimestamp()
    if (!countDown) {
      return undefined
    }

    const pad2 = (value) => String(value).padStart(2, '0')

    const tick = () => {
      const now = Date.now()
      const distance = countDown - now

      if (distance <= 0) {
        setTimeLeft({
          days: '0',
          hours: '00',
          minutes: '00',
          seconds: '00',
        })
        return false
      }

      const d = Math.floor(distance / day)
      const h = Math.floor((distance % day) / hour)
      const m = Math.floor((distance % hour) / minute)
      const s = Math.floor((distance % minute) / second)

      setTimeLeft({
        days: String(d),
        hours: pad2(h),
        minutes: pad2(m),
        seconds: pad2(s),
      })

      return true
    }

    tick()

    const timer = setInterval(() => {
      const alive = tick()
      if (!alive) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="flash_sale_banner_section">
      <div id="flash_sale_banner_container" className="unmarked">
        <div id="flash_sale_banner_info_container" className="unmarked">
          <p className="text_line" id="line1">
            HOLIDAY FLASH SALE
          </p>
          <p className="text_line" id="line2">
            10% OFF
          </p>
          <p className="text_line" id="line3">
            EVERYTHING
          </p>
          <p className="text_line" id="line4">
            THIS WEEK ONLY
          </p>

          <div className="flash_sale_countdown_container" aria-label="Sale ends in">
            <div id="countdown" role="timer" aria-live="polite">
              <ul>
                <li className="flash_sale_countdown_list_item">
                  <span id="days" className="flash_sale_countdown_date_text">
                    {timeLeft.days}
                  </span>
                  days
                </li>
                <li className="flash_sale_countdown_list_item">
                  <span id="hours" className="flash_sale_countdown_date_text">
                    {timeLeft.hours}
                  </span>
                  Hours
                </li>
                <li className="flash_sale_countdown_list_item">
                  <span id="minutes" className="flash_sale_countdown_date_text">
                    {timeLeft.minutes}
                  </span>
                  Min
                </li>
                <li className="flash_sale_countdown_list_item">
                  <span id="seconds" className="flash_sale_countdown_date_text">
                    {timeLeft.seconds}
                  </span>
                  SEC
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HolidayFlashSaleBanner
