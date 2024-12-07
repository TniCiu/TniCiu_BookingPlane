package API.BookingPlane.Repository;

import API.BookingPlane.Model.Account;
import API.BookingPlane.Model.CartItem;
import API.BookingPlane.Model.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByAccount_Id(UUID accountId);

    //Kiem tra xem san pham da co trong gio hang chua
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM cart_item WHERE account_id = :accountId AND product_id IN :productIds", nativeQuery = true)
    void deleteByAccountIdAndProductIds(@Param("accountId") UUID accountId, @Param("productIds") List<Long> productIds);

    Optional<CartItem> findByProductAndAccount(Product product, Account account);

}
