import { 
  users, holdings, orders, positions,
  type User, type InsertUser, type Holding, type InsertHolding,
  type Order, type InsertOrder, type Position, type InsertPosition
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getUserHoldings(userId: number): Promise<Holding[]>;
  
  getUserOrders(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  
  getUserPositions(userId: number): Promise<Position[]>;
  
  authenticateUser(username: string, password: string, broker: string): Promise<User | null>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private holdings: Map<number, Holding>;
  private orders: Map<number, Order>;
  private positions: Map<number, Position>;
  private currentUserId: number;
  private currentHoldingId: number;
  private currentOrderId: number;
  private currentPositionId: number;

  constructor() {
    this.users = new Map();
    this.holdings = new Map();
    this.orders = new Map();
    this.positions = new Map();
    this.currentUserId = 1;
    this.currentHoldingId = 1;
    this.currentOrderId = 1;
    this.currentPositionId = 1;
    
    this.initializeMockData();
  }

  private initializeMockData() {
    const testUser: User = {
      id: 1,
      username: "test",
      password: "test123",
      broker: "zerodha",
      isActive: true,
    };
    this.users.set(1, testUser);
    this.currentUserId = 2;

    const mockHoldings: Holding[] = [
      {
        id: 1,
        userId: 1,
        symbol: "RELIANCE",
        quantity: 50,
        avgPrice: "2340.20",
        ltp: "2456.75",
        companyName: "Reliance Industries Limited",
      },
      {
        id: 2,
        userId: 1,
        symbol: "TCS",
        quantity: 30,
        avgPrice: "3180.75",
        ltp: "3234.50",
        companyName: "Tata Consultancy Services",
      },
      {
        id: 3,
        userId: 1,
        symbol: "HDFC",
        quantity: 25,
        avgPrice: "1520.45",
        ltp: "1567.30",
        companyName: "HDFC Bank Limited",
      },
    ];

    mockHoldings.forEach(holding => {
      this.holdings.set(holding.id, holding);
    });
    this.currentHoldingId = 4;

    const mockOrders: Order[] = [
      {
        id: 1,
        userId: 1,
        symbol: "RELIANCE",
        orderType: "BUY",
        orderMode: "MARKET",
        product: "CNC",
        quantity: 25,
        price: "2456.75",
        status: "COMPLETED",
        validity: "DAY",
        createdAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        symbol: "WIPRO",
        orderType: "SELL",
        orderMode: "LIMIT",
        product: "CNC",
        quantity: 40,
        price: "425.30",
        status: "COMPLETED",
        validity: "DAY",
        createdAt: new Date(Date.now() - 86400000),
      },
    ];

    mockOrders.forEach(order => {
      this.orders.set(order.id, order);
    });
    this.currentOrderId = 3;

    const mockPositions: Position[] = [
      {
        id: 1,
        userId: 1,
        symbol: "INFY",
        positionType: "LONG",
        quantity: 20,
        entryPrice: "1444.55",
        ltp: "1456.80",
        companyName: "Infosys Limited",
      },
      {
        id: 2,
        userId: 1,
        symbol: "SBIN",
        positionType: "SHORT",
        quantity: 15,
        entryPrice: "572.50",
        ltp: "567.25",
        companyName: "State Bank of India",
      },
    ];

    mockPositions.forEach(position => {
      this.positions.set(position.id, position);
    });
    this.currentPositionId = 3;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, isActive: true };
    this.users.set(id, user);
    return user;
  }

  async getUserHoldings(userId: number): Promise<Holding[]> {
    return Array.from(this.holdings.values()).filter(
      (holding) => holding.userId === userId,
    );
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter((order) => order.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date(),
      status: "COMPLETED", // Simulate successful order placement
      price: insertOrder.price || null,
      validity: insertOrder.validity || "DAY"
    };
    this.orders.set(id, order);
    return order;
  }

  async getUserPositions(userId: number): Promise<Position[]> {
    return Array.from(this.positions.values()).filter(
      (position) => position.userId === userId,
    );
  }

  async authenticateUser(username: string, password: string, broker: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    
    if (!user) {
      return null;
    }
    
    if (user.password !== password || user.broker !== broker) {
      return null;
    }
    
    return user;
  }
}

export const storage = new MemStorage();
