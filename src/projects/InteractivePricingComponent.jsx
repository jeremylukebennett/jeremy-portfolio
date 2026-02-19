import { useMemo, useState } from 'react'

function InteractivePricingComponent() {
  const [billing, setBilling] = useState('monthly')
  const [seats, setSeats] = useState(5)

  const monthlyPricePerSeat = 14
  const yearlyPricePerSeat = 11

  const totalPrice = useMemo(() => {
    const seatPrice = billing === 'monthly' ? monthlyPricePerSeat : yearlyPricePerSeat
    return seatPrice * seats
  }, [billing, seats])

  return (
    <div className="mx-auto max-w-[640px] border border-[#2A2A2A] bg-[#F5F5F5] p-4 md:p-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setBilling('monthly')}
          className={`border px-3 py-2 text-xs font-semibold tracking-[-0.03em] transition-colors duration-150 ease-out ${
            billing === 'monthly'
              ? 'border-[#FFD600] bg-[#FFD600] text-black'
              : 'border-[#2A2A2A] text-[#1A1A1A]'
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setBilling('yearly')}
          className={`border px-3 py-2 text-xs font-semibold tracking-[-0.03em] transition-colors duration-150 ease-out ${
            billing === 'yearly'
              ? 'border-[#FFD600] bg-[#FFD600] text-black'
              : 'border-[#2A2A2A] text-[#1A1A1A]'
          }`}
        >
          Yearly (Save 21%)
        </button>
      </div>

      <div className="mt-6 border border-[#2A2A2A] p-4">
        <p className="text-xs font-semibold tracking-[-0.03em] text-[#1A1A1A]">Seats</p>
        <p className="mt-1 text-4xl font-semibold tracking-[-0.04em] text-black">{seats}</p>

        <input
          type="range"
          min="1"
          max="25"
          value={seats}
          onChange={(event) => setSeats(Number(event.target.value))}
          className="mt-4 w-full accent-[#E91E90]"
          aria-label="Seat count"
        />

        <div className="mt-6 border-t border-[#2A2A2A] pt-4">
          <p className="text-xs font-semibold tracking-[-0.03em] text-[#1A1A1A]">
            Estimated Price
          </p>
          <p className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-black">
            ${totalPrice}
            <span className="ml-2 text-base font-semibold tracking-[-0.03em] text-[#1A1A1A]">
              / {billing === 'monthly' ? 'month' : 'month (annual plan)'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default InteractivePricingComponent
