import { OnPool, OnReferral, OnTrade, OnUser} from '../generated/Token/Token'
import { Pool, Referral, Trade, Tcount, User} from '../generated/schema'

export function handlePool(event: OnPool): void {
  let id = event.params.t_count.toString();
  let tcount = new Tcount(id);
  tcount.t_count = event.params.t_count.toI32();
  tcount.save();
  let transaction = new Pool(id); 
  transaction.t_count = event.params.t_count.toI32();
  transaction.a = event.params.a.toI32();
  transaction.b = event.params.b.toI32();
  transaction.c = event.params.c.toI32();
  transaction.d = event.params.d.toI32();
  transaction.reward = event.params.reward.toI32();
  transaction.pool = event.params.pool;
  transaction.save()
}

export function handleReferral(event: OnReferral): void {
  let id = event.params.addr.toHexString();
  let current = Referral.load(id);
  if(current) {
    current.fee = event.params.fee.toI32();
    current.total_fee += event.params.fee.toI32();
    current.ref_count += 1;
  } else {
    let referral = new Referral(id);
    referral.addr = event.params.addr.toHexString();
    referral.fee = event.params.fee.toI32();
    referral.total_fee = 0;
    referral.ref_count = 0;
    referral.save()
  }
}

export function handleTrade(event: OnTrade): void {
  let id = event.params.t_count.toString();
  let tcount = new Tcount(id);
  tcount.t_count = event.params.t_count.toI32();
  tcount.save();
  let trade = new Trade(id)
  trade.t_count = event.params.t_count.toI32();
  trade.buy = event.params.buy.toI32();
  trade.sell = event.params.sell.toI32();;
  trade.buy_liq = event.params.buy_liq.toI32();
  trade.sell_liq = event.params.sell_liq;
  trade.trade = event.params.buy.minus(event.params.sell).toI32();
  trade.save()
}


export function handleUser(event: OnUser): void {
  let id = event.params.addr.toHexString();
  let user = new User(id);
  user.addr = event.params.addr.toHexString();
  user.staked = event.params.staked.toI32();
  user.pool_amount = event.params.pool_amount.toI32();
  user.t_count = event.params.t_count.toI32();
  user.t_count_max = event.params.t_count_max.toI32();
  user.join_pool = event.params.join_pool;  
  user.referred_by = event.params.referred_by.toHexString();  
  user.save()
}

 