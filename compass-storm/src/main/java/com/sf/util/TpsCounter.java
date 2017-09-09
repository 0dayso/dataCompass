package com.sf.util;

import com.alibaba.jstorm.utils.IntervalCheck;
import java.io.Serializable;
import java.util.concurrent.atomic.AtomicLong;
import org.apache.log4j.Logger;

public class TpsCounter
  implements Serializable
{
  private static final long serialVersionUID = 2177944366059817622L;
  private AtomicLong total = new AtomicLong(0L);
  private AtomicLong times = new AtomicLong(0L);
  private AtomicLong values = new AtomicLong(0L);
  private IntervalCheck intervalCheck;
  private final String id;
  private final Logger LOG;

  public TpsCounter()
  {
    this("", TpsCounter.class);
  }

  public TpsCounter(String id) {
    this(id, TpsCounter.class);
  }

  public TpsCounter(Class tclass) {
    this("", tclass);
  }

  public TpsCounter(String id, Class tclass)
  {
    this.id = id;
    this.LOG = Logger.getLogger(tclass);

    this.intervalCheck = new IntervalCheck();
    this.intervalCheck.setInterval(60L);
  }

  public Double count(long value) {
    long totalValue = this.total.incrementAndGet();
    long timesValue = this.times.incrementAndGet();
    long v = this.values.addAndGet(value);

    Double pass = this.intervalCheck.checkAndGet();
    if (pass != null) {
      this.times.set(0L);
      this.values.set(0L);

      Double tps = Double.valueOf(timesValue / pass.doubleValue());

      StringBuilder sb = new StringBuilder();
      sb.append(this.id);
      sb.append(", tps:" + tps);
      sb.append(", avg:" + v / timesValue);
      sb.append(", total:" + totalValue);
      this.LOG.info(sb.toString());

      return tps;
    }

    return null;
  }

  public Double count() {
    return count(Long.valueOf(1L).longValue());
  }

  public void cleanup()
  {
    this.LOG.info(this.id + ", total:" + this.total);
  }

  public IntervalCheck getIntervalCheck()
  {
    return this.intervalCheck;
  }

  public static void main(String[] args)
  {
  }
}