import * as cluster from 'cluster'

cluster.isMaster ? require('./master') : require('./worker')
