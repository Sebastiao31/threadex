import React from 'react'

const TwitterSignIn = () => {
  return (
    <div style={{ padding: 50 }}>
      <h1>Connect your X (Twitter) Account</h1>
      <a href="/api/auth/request-token">
        <button style={{ fontSize: 18, padding: "10px 20px" }}>
          Authorize with Twitter
        </button>
      </a>
    </div>
  )
}

export default TwitterSignIn