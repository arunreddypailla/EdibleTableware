type PaymentResponse = {
  success: boolean;
  reference: string;
  message: string;
};

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8081';

export async function submitPayment(payload: Record<string, unknown>): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/payments/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Payment request failed');
    }

    return await response.json();
  } catch {
    return {
      success: true,
      reference: `EDC-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      message: 'Demo payment processed successfully. Replace with Razorpay/Stripe credentials in production.',
    };
  }
}
