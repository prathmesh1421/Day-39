// src/screens/PharmacyScreen.js
import { useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const medicines = [
  { id: "1", name: "Paracetamol", price: "₹20", category: "Pain Relief", emoji: "💊" },
  { id: "2", name: "Ibuprofen", price: "₹35", category: "Anti-Inflammatory", emoji: "🔵" },
  { id: "3", name: "Amoxicillin", price: "₹80", category: "Antibiotic", emoji: "🟡" },
  { id: "4", name: "Cough Syrup", price: "₹60", category: "Cold & Flu", emoji: "🧴" },
  { id: "5", name: "Cetirizine", price: "₹25", category: "Antihistamine", emoji: "💉" },
  { id: "6", name: "Omeprazole", price: "₹45", category: "Antacid", emoji: "🟢" },
];

// --- ANIMATED MEDICINE CARD ---
const MedicineCard = ({ item, index, onAddToCart, inCart }) => {
  const animationEnter = FadeIn.delay(index * 100).duration(400);
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX > 0 ? e.translationX : 0;
    })
    .onEnd(() => {
      if (translateX.value > 80) {
        onAddToCart();
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View entering={animationEnter} style={styles.medicineContainer}>
        {/* Swipe Background */}
        <View style={styles.cartBackground}>
          <Text style={styles.cartIcon}>🛒</Text>
          <Text style={styles.cartText}>Add to Cart</Text>
        </View>

        {/* Card */}
        <Animated.View style={[styles.medicineCard, animatedStyle]}>
          <View style={styles.cardTopRow}>
            <View style={styles.emojiCircle}>
              <Text style={styles.emojiText}>{item.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.medicineName}>{item.name}</Text>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.priceText}>{item.price}</Text>
              <TouchableOpacity
                style={[styles.addBtn, inCart && styles.addBtnActive]}
                onPress={onAddToCart}
              >
                <Text style={[styles.addBtnText, inCart && styles.addBtnTextActive]}>
                  {inCart ? "✓" : "+"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

// --- CART ITEM ---
const CartItem = ({ item, onRemove }) => (
  <View style={styles.cartItem}>
    <Text style={styles.cartItemEmoji}>{item.emoji}</Text>
    <View style={{ flex: 1 }}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>{item.price}</Text>
    </View>
    <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
      <Text style={styles.removeBtnText}>✕</Text>
    </TouchableOpacity>
  </View>
);

// --- MAIN SCREEN ---
export default function PharmacyScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const handleLogout = () => navigation.replace("Login");

  const handleAddToCart = (item) => {
    if (cart.find((c) => c.id === item.id)) return;
    setCart((prev) => [...prev, item]);
    Alert.alert("Added!", `${item.name} added to cart 🛒`);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert("Cart Empty", "Add medicines to cart first");
      return;
    }
    Alert.alert("Order Placed", `${cart.length} item(s) ordered successfully ✅`);
    setCart([]);
    setCartVisible(false);
  };

  const totalPrice = cart.reduce((sum, item) => {
    const num = parseInt(item.price.replace("₹", ""), 10);
    return sum + num;
  }, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Hospital System</Text>
          <Text style={styles.headerTitle}>Pharmacy</Text>
        </View>
        <View style={styles.headerRight}>
          {/* Cart Button */}
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => setCartVisible((v) => !v)}
          >
            <Text style={styles.cartBtnText}>🛒</Text>
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cart Panel */}
      {cartVisible && (
        <View style={styles.cartPanel}>
          <Text style={styles.cartPanelTitle}>🛒 Cart ({cart.length})</Text>
          {cart.length === 0 ? (
            <Text style={styles.cartEmpty}>No items in cart</Text>
          ) : (
            <>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemoveFromCart(item.id)}
                />
              ))}
              <View style={styles.cartDivider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>₹{totalPrice}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
                <Text style={styles.checkoutBtnText}>Checkout 🚀</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {/* Medicine List */}
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <MedicineCard
            item={item}
            index={index}
            inCart={!!cart.find((c) => c.id === item.id)}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Available Medicines</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
  },

  // ── Header ──
  header: {
    backgroundColor: "#1e1b4b",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerSub: {
    color: "#a5b4fc",
    fontSize: 13,
    marginBottom: 4,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cartBtn: {
    backgroundColor: "#312e81",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#4338ca",
  },
  cartBtnText: { fontSize: 20 },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#ef4444",
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: "#312e81",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#4338ca",
  },
  logoutText: {
    color: "#a5b4fc",
    fontSize: 14,
    fontWeight: "bold",
  },

  // ── Cart Panel ──
  cartPanel: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 18,
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
    elevation: 4,
  },
  cartPanelTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e1b4b",
    marginBottom: 12,
  },
  cartEmpty: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 8,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  cartItemEmoji: { fontSize: 20 },
  cartItemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e1b4b",
  },
  cartItemPrice: {
    fontSize: 13,
    color: "#6366f1",
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnText: {
    color: "#dc2626",
    fontWeight: "bold",
    fontSize: 12,
  },
  cartDivider: {
    height: 0.5,
    backgroundColor: "#e0e7ff",
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e1b4b",
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4338ca",
  },
  checkoutBtn: {
    backgroundColor: "#1e1b4b",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  checkoutBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  // ── List ──
  listContent: {
    padding: 20,
    paddingBottom: 100,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1b4b",
    marginBottom: 16,
    width: Platform.OS === "web" ? 500 : "100%",
  },

  // ── Medicine Card ──
  medicineContainer: {
    width: Platform.OS === "web" ? 500 : "100%",
    marginBottom: 14,
    position: "relative",
    overflow: "hidden",
    borderRadius: 20,
  },
  cartBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#4338ca",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 25,
    borderRadius: 20,
    flexDirection: "row",
  
  },
  cartIcon: { fontSize: 20, marginRight: 8 },
  cartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  medicineCard: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  emojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
    borderWidth: 0.5,
    borderColor: "#c7d2fe",
  },
  emojiText: { fontSize: 22 },
  medicineName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e1b4b",
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 12,
    color: "#6366f1",
  },
  rightCol: {
    alignItems: "center",
    gap: 6,
  },
  priceText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4338ca",
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#c7d2fe",
  },
  addBtnActive: {
    backgroundColor: "#1e1b4b",
    borderColor: "#1e1b4b",
  },
  addBtnText: {
    fontSize: 18,
    color: "#4338ca",
    fontWeight: "bold",
    lineHeight: 20,
  },
  addBtnTextActive: {
    color: "#ffffff",
    fontSize: 14,
  },
});