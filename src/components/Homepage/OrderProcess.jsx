export const OrderProcess = () => {
  return (
    <section className="py-20 flex flex-col items-center justify-center w-full">
      <h2 className="text-center text-xl lg:text-3xl font-bold text-gray-700 -mt-12 mb-16 dark:text-gray-200">
        Ordering Process
      </h2>
      <ul className="steps steps-vertical lg:steps-horizontal text-gray-700">
        <li className="step step-info">
          <div className="text-left lg:text-center">
            <p className="font-bold">Register</p>

            <p>Create account</p>
          </div>
        </li>
        <li className="step step-primary">
          <div className="text-left lg:text-center">
            <p className="font-bold">Pick product</p>
            <p>Place Order with delivery information</p>
          </div>
        </li>
        <li className="step step-secondary">
          <div className="text-left lg:text-center">
            <p className="font-bold">Payment</p>
            <p>Make payment for your order</p>
          </div>
        </li>
        <li className="step step-success">
          <div className="text-left lg:text-center">
            <p className="font-bold">Confirmation</p>
            <p>Order complete</p>
          </div>
        </li>
      </ul>
    </section>
  );
};
