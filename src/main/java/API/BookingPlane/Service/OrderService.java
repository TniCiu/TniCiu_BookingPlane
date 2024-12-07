package API.BookingPlane.Service;

import API.BookingPlane.Model.Account;
import API.BookingPlane.Model.Order;
import API.BookingPlane.Model.OrderDetail;
import API.BookingPlane.Repository.AccountRepository;
import API.BookingPlane.Repository.CartItemRepository;
import API.BookingPlane.Repository.OrderRepository;
import API.BookingPlane.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private ProductRepository productRepository;

    private Map<String, Order> temporaryOrders = new HashMap<>();
    public Order createOrder(Order order) {
        Optional<Account> accountOptional = accountRepository.findById(order.getAccount().getId());

        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            order.setAccount(account);

            // Khởi tạo ngày nhận phòng sớm nhất và trả phòng muộn nhất
            LocalDateTime earliestCheckInDateTime = LocalDateTime.MAX; // Giá trị lớn nhất ban đầu
            LocalDateTime latestCheckOutDateTime = LocalDateTime.MIN; // Giá trị nhỏ nhất ban đầu

            for (OrderDetail orderDetail : order.getOrderDetails()) {
                // Gán Order cho từng OrderDetail
                orderDetail.setOrder(order);

                // Tính toán ngày nhận phòng và trả phòng riêng cho từng sản phẩm
                LocalDateTime checkInDateTime = LocalDateTime.now(); // Ngày nhận phòng là hiện tại
                LocalDateTime checkOutDateTime = checkInDateTime.plusDays(orderDetail.getNight()); // Tính ngày trả phòng dựa vào số đêm

                // Gán ngày nhận phòng và trả phòng cho OrderDetail
                orderDetail.setCheckInDateTime(checkInDateTime);
                orderDetail.setCheckOutDateTime(checkOutDateTime);

                // Cập nhật ngày nhận phòng sớm nhất và trả phòng muộn nhất
                if (checkInDateTime.isBefore(earliestCheckInDateTime)) {
                    earliestCheckInDateTime = checkInDateTime;
                }
                if (checkOutDateTime.isAfter(latestCheckOutDateTime)) {
                    latestCheckOutDateTime = checkOutDateTime;
                }
            }


            return orderRepository.save(order);
        } else {
            throw new RuntimeException("Tài khoản không tìm thấy với id: " + order.getAccount().getId());
        }
    }

    // Lấy tất cả đơn hàng
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Lấy đơn hàng theo ID
    public Order getOrderById(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.orElseThrow(() -> new RuntimeException("Order not found"));
    }
    // Lấy đơn hàng theo ID Khách Hàng
    public List<Order> getOrdersByAccountId(UUID accountId) {
        return orderRepository.findByAccountId(accountId);
    }


    // Cập nhật thông tin đơn hàng
    public Order updateOrder(Long id, Order orderDetails) {
        Order existingOrder = getOrderById(id);
        existingOrder.setFirstName(orderDetails.getFirstName());
        existingOrder.setLastName(orderDetails.getLastName());
        existingOrder.setPhoneNumber(orderDetails.getPhoneNumber());
        existingOrder.setEmail(orderDetails.getEmail());
        existingOrder.setPaymentMethod(orderDetails.getPaymentMethod());
        existingOrder.setOrderDetails(orderDetails.getOrderDetails());
        return orderRepository.save(existingOrder);
    }

    // Xóa đơn hàng theo ID
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public Order getOrderByTxnRef(String vnpTxnRef) {
        return temporaryOrders.get(vnpTxnRef);
    }
    public void saveTemporaryOrder(Order order) {
        temporaryOrders.put(order.getVnpTxnRef(), order);
    }


}
