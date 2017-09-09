package com.sf.user.bolt;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.BasicOutputCollector;
import backtype.storm.topology.IBasicBolt;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Tuple;
import backtype.storm.tuple.Values;
import com.sf.user.bean.Register;
import com.sf.user.bean.Visit;
import com.sf.util.TpsCounter;
import org.apache.log4j.Logger;

import java.util.Map;

public class AdDataRegisterBolt
  implements IBasicBolt
{
  private static final long serialVersionUID = -135084302785696296L;
  private static final Logger LOG = Logger.getLogger(AdDataRegisterBolt.class);
  private OutputCollector collector;
  private TpsCounter tpsCounter;

  public void cleanup()
  {
    this.tpsCounter.cleanup();
    LOG.info("Finish cleanup");
  }

  public void execute(Tuple tuple, BasicOutputCollector collector)
  {
    this.tpsCounter.count();
    Long tupleId = tuple.getLong(0);
    Object obj = tuple.getValue(1);
    if ((obj instanceof Register)) {
      Register adDataVO = (Register)obj;
      collector.emit("adData_register_count_stream", new Values(new Object[] { tupleId, adDataVO, adDataVO.getIp() }));
    } else if (obj != null) {
      LOG.info("Unknow type " + obj.getClass().getName());
    } else {
      LOG.info("Nullpointer ");
    }
  }

  public void prepare(Map stormConf, TopologyContext context)
  {
    this.tpsCounter = new TpsCounter(context.getThisComponentId() + ":" + context.getThisTaskId());

    LOG.info("Successfully do prepare");
  }

  public void declareOutputFields(OutputFieldsDeclarer declarer)
  {
    declarer.declareStream("adData_register_count_stream", new Fields(new String[] { "id", "AdRegister", "ip" }));
  }

  public Map<String, Object> getComponentConfiguration()
  {
    return null;
  }
}