import MetaTrader5 as mt5
import pandas as pd
import time

# =============================================================================
# BASIC OPEN-SOURCE MT5 BOT (EDUCATIONAL PURPOSES ONLY)
# For Institutional-Grade Infrastructure (ECN Bypass, Trailing Shields, etc.)
# Contact the Developer in the README.md
# =============================================================================

SYMBOL = "EURUSD"
LOT_SIZE = 0.01
MAGIC_NUMBER = 123456

def get_market_data(symbol, timeframe, n=50):
    rates = mt5.copy_rates_from_pos(symbol, timeframe, 0, n)
    if rates is None:
        return None
    df = pd.DataFrame(rates)
    df['time'] = pd.to_datetime(df['time'], unit='s')
    return df

def main():
    print("Initializing Basic MT5 Connection...")
    if not mt5.initialize():
        print("initialize() failed, error code =", mt5.last_error())
        return

    print(f"Connected to MT5. Hunting for signals on {SYMBOL}...")

    while True:
        df = get_market_data(SYMBOL, mt5.TIMEFRAME_M15)
        if df is None:
            time.sleep(5)
            continue

        # Basic MA Crossover Logic
        df['fast_ma'] = df['close'].rolling(10).mean()
        df['slow_ma'] = df['close'].rolling(30).mean()
        
        fast = df['fast_ma'].iloc[-1]
        slow = df['slow_ma'].iloc[-1]
        close = df['close'].iloc[-1]

        positions = mt5.positions_get(symbol=SYMBOL)
        
        if positions is None or len(positions) == 0:
            if fast > slow and close > fast:
                print("Basic Bullish Signal Detected. Sending Market Buy...")
                request = {
                    "action": mt5.TRADE_ACTION_DEAL,
                    "symbol": SYMBOL,
                    "volume": LOT_SIZE,
                    "type": mt5.ORDER_TYPE_BUY,
                    "price": mt5.symbol_info_tick(SYMBOL).ask,
                    "deviation": 20,
                    "magic": MAGIC_NUMBER,
                    "comment": "Basic Bot",
                    "type_time": mt5.ORDER_TIME_GTC,
                    "type_filling": mt5.ORDER_FILLING_IOC,
                }
                mt5.order_send(request)
                time.sleep(60) # Cooldown
                
        time.sleep(5)

if __name__ == "__main__":
    main()
