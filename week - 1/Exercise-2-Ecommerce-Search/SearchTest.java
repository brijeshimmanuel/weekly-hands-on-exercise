import java.util.Arrays;
import java.util.Comparator;

public class SearchTest {

   
    public static Product linearSearch(Product[] products, int targetId) {
        for (Product p : products) {
            if (p.productId == targetId) {
                return p;          
            }
        }
        return null;               
    }

    public static Product binarySearch(Product[] products, int targetId) {
        int low = 0;
        int high = products.length - 1;

        while (low <= high) {
            int mid = (low + high) / 2;

            if (products[mid].productId == targetId) {
                return products[mid];          
            } else if (products[mid].productId < targetId) {
                low = mid + 1;                 
            } else {
                high = mid - 1;                
            }
        }
        return null;                           
    }

    public static void main(String[] args) {

        Product[] products = {
            new Product(105, "Laptop", "Electronics"),
            new Product(101, "Shoes", "Fashion"),
            new Product(103, "Coffee Maker", "Home"),
            new Product(102, "Headphones", "Electronics"),
            new Product(104, "Backpack", "Fashion")
        };

        System.out.println("=== Linear Search ===");
        Product result1 = linearSearch(products, 103);
        System.out.println(result1 != null ? "Found: " + result1 : "Not found");

        Product[] sortedProducts = products.clone();
        Arrays.sort(sortedProducts, Comparator.comparingInt(p -> p.productId));

        System.out.println();
        System.out.println("=== Binary Search (sorted by productId) ===");

        Product result2 = binarySearch(sortedProducts, 103);
        System.out.println(result2 != null ? "Found: " + result2 : "Not found");

        Product result3 = binarySearch(sortedProducts, 999);
        System.out.println(result3 != null ? "Found: " + result3 : "Product 999 Not found");
    }
}
