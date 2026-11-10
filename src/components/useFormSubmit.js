import { useState } from 'react'
import { site } from '../data/site'

// Sends any form to AfriYouth's email using Web3Forms (no server needed).
// Without an access key it shows a success message for demo purposes.
export default function useFormSubmit(subject) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(event.target))

    if (!site.formAccessKey) {
      setTimeout(() => setStatus('sent'), 700)
      return
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, subject, access_key: site.formAccessKey }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return { status, handleSubmit }
}
