import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Spinner } from '../../components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { confirmModal } from '../../utils/ConfirmModal';
import { useNavigate } from 'react-router-dom';

import authFetch from '../../config/axios';
import auth from '../../config/firebase';
import MySwal from '../../config/sweetAlert';

export const MyOrders = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (user) {
      const { data } = await authFetch.get(`/orders/${user.uid}`);
      return data;
    }
  };
  const { data: orderList, isLoading, refetch } = useQuery('data', fetchOrders);

  const handleCancel = async (orderId, productId, orderQuantity) => {
    const res = await confirmModal('You want to cancel your order?', 'Yes, cancel it', 'No');

    if (res.isConfirmed) {
      const response = await authFetch.delete(`/orders/cancel/${orderId}`);

      if (response.status === 200) {
        await authFetch.put(`/products/update-available-quantity/${productId}`, {
          quantity: orderQuantity,
        });

        MySwal.fire('Success', 'Your order is cancelled successfully', 'success');
        refetch();
      }
    }
  };

  if (loading || isLoading) {
    return <Spinner />;
  }
  return (
    <section className="py-10 px-8 xl:px-20">
      {orderList?.length === 0 ? (
        <h1 className="text-2xl lg:text-3xl text-neutral font-semibold text-center py-20">
          You have not ordered anything yet!
        </h1>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    Name
                    <i>
                      <MdOutlineKeyboardArrowDown className="w-4 h-4 ml-1.5 text-gray-700" />
                    </i>
                  </div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    Status
                    <i>
                      <MdOutlineKeyboardArrowDown className="w-4 h-4 ml-1.5 text-gray-700" />
                    </i>
                  </div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    Order Quantity
                    <i>
                      <MdOutlineKeyboardArrowDown className="w-4 h-4 ml-1.5 text-gray-700" />
                    </i>
                  </div>
                </th>

                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    Total
                    <i>
                      <MdOutlineKeyboardArrowDown className="w-4 h-4 ml-1.5 text-gray-700" />
                    </i>
                  </div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    Amount Paid
                    <i>
                      <MdOutlineKeyboardArrowDown className="w-4 h-4 ml-1.5 text-gray-700" />
                    </i>
                  </div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    Actions
                    <i>
                      <MdOutlineKeyboardArrowDown className="w-4 h-4 ml-1.5 text-gray-700" />
                    </i>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orderList?.map((order) => (
                <tr key={order._id}>
                  <td className="p-4 font-medium whitespace-nowrap">{order.productName}</td>
                  <td className="p-4 whitespace-nowrap">
                    {order.status === 'pending' ? (
                      <strong className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded text-xs font-medium">
                        Pending
                      </strong>
                    ) : (
                      <strong className="bg-green-100 text-green-700 px-3 py-1.5 rounded text-xs font-medium">
                        Shipped
                      </strong>
                    )}
                  </td>
                  <td className="p-4 text-gray-700 whitespace-nowrap">{order.orderQuantity}</td>

                  <td className="p-4 text-gray-700 whitespace-nowrap">
                    $&nbsp;{order.total?.toFixed(2)}
                  </td>
                  <td className="p-4 text-gray-700 whitespace-nowrap">
                    {order?.paid ? (
                      <i>
                        <div className="sr-only">Yes Paid</div>
                        <AiOutlineCheck className="w-6 h-6 font-bold text-success" />
                      </i>
                    ) : (
                      <i>
                        <div className="sr-only">Not Paid yet</div>
                        <AiOutlineClose className="w-6 h-6 font-bold text-error" />
                      </i>
                    )}
                  </td>
                  <td>
                    {!order.paid && (
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/payment`, {
                              state: {
                                productName: order?.productName,
                                total: order?.total,
                                quantity: order?.orderQuantity,
                                productId: order?.productId,
                                orderId: order?._id,
                                ordererName: order?.name,
                                ordererEmail: order?.email,
                              },
                            })
                          }
                          type="button"
                          className="btn btn-sm btn-accent normal-case text-neutral text-opacity-90"
                        >
                          Pay now
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-error normal-case text-neutral text-opacity-80"
                          onClick={() =>
                            handleCancel(order._id, order.productId, order.orderQuantity)
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

            {orderList?.length > 10 && (
              <tfoot>
                <tr className="bg-slate-50">
                  <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">Name</div>
                  </th>
                  <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">Status</div>
                  </th>
                  <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">Order Quantity</div>
                  </th>

                  <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">Total</div>
                  </th>
                  <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">Amount Paid</div>
                  </th>
                  <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">Actions</div>
                  </th>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}
    </section>
  );
};
