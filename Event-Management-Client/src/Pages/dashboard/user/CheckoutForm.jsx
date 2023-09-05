// CheckoutForm.js
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

// import './CheckoutForm.css';

const CheckoutForm = ({ productsPage, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        // console.log(price);
        if (price > 0) {
            axios.post('https://event-management-server.vercel.app/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    // Handle any errors that occurred during the request
                    console.error('Error creating payment intent:', error);
                });
        }
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        // console.log('Card: ', card);
        // Use your card Element with other Stripe.js APIs
        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError('');
            // console.log('[PaymentMethod]', paymentMethod);
        }
        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }
        console.log('payment intent', paymentIntent)
        setProcessing(false); // done processing


        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: productsPage.length,
                cartItems: productsPage.map(item => item._id),
                status: 'service pending',
                itemNames: productsPage.map(item => item.productName)
            }
            console.log('Success:', payment);

            axios.post('https://event-management-server.vercel.app/payments', payment)
                .then(res => {
                    console.log('Payment', res.data);
                    // if (res.data.result.insertedId) {
                    //     // display confirm
                    // }
                })
                .catch(error => {
                    // Handle any errors that occurred during the request
                    console.error('Error making payment:', error);
                });
        }
    }

    return (
        <>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {/* <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe}> */}
                <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
            {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;