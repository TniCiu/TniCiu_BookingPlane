package API.BookingPlane.Controller;

import API.BookingPlane.Model.CartItem;
import API.BookingPlane.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;


    // Lấy danh sách giỏ hàng của khách hàng theo accountId
    @GetMapping("account/{accountId}")
    public ResponseEntity<List<CartItem>> listCartItems(@PathVariable UUID accountId) {
        List<CartItem> cartItems = cartService.listCartItems(accountId);
        return ResponseEntity.ok(cartItems);
    }

    // Thêm sản phẩm vào giỏ hàng
    @PostMapping("/create")
    public ResponseEntity<CartItem> addItemToCart(
            @RequestParam Long productId,
            @RequestParam int night,
            @RequestParam UUID accountId
    ) {
        CartItem cartItem = cartService.addItemToCart(productId, night, accountId);
        return ResponseEntity.ok(cartItem);
    }

    // Cập nhật sản phẩm trong giỏ hàng
    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItem(
            @PathVariable Long cartItemId,
            @RequestParam int night
    ) {
        CartItem updatedCartItem = cartService.updateCartItem(cartItemId, night);
        return ResponseEntity.ok(updatedCartItem);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long cartItemId) {
        cartService.deleteCartItem(cartItemId);
        return ResponseEntity.noContent().build();
    }

//    // Xử lý lỗi validation
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getFieldErrors().forEach(error ->
//                errors.put(error.getField(), error.getDefaultMessage())
//        );
//        return errors;
//    }
//
//    // Xử lý lỗi chung
//    @ExceptionHandler(RuntimeException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public Map<String, String> handleRuntimeException(RuntimeException ex) {
//        Map<String, String> error = new HashMap<>();
//        error.put("error", ex.getMessage());
//        return error;
//    }
}
