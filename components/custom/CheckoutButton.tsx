import React from 'react';
import { useRouter } from 'next/navigation';
import { getStripe } from '@/utils/stripe-helpers';

interface CheckoutButtonProps {
    priceId: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ priceId }) => {
    const router = useRouter();

    const handleCheckout = async () => {
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: priceId,
            }),
        });

        const { sessionId } = await response.json();

        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
            sessionId,
        });

        if (error) {
            console.warn(error.message);
        }
    };

    return (
        <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">
            Checkout
        </button>
    );
};

export default CheckoutButton;