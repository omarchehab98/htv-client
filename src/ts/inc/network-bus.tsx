/**
 * Promise polyfill
 */
import {Promise} from 'promise-polyfill';
if (!window['Promise']) window['Promise'] = Promise;
/**
 * Fetch polyfill
 */
import 'whatwg-fetch';

const DEBUG = false;
import {networkBusDebug} from './network-bus-debug';

import {AllTrends, AllTrendsPacket} from '../classes/alltrends';
import {Trend, TrendPacket} from '../classes/trend';
import {ContentTweetsPacket} from '../classes/tweet';
import {ContentArticlesPacket} from '../classes/article';

const api = 'http://neptune.gunshippenguin.com:8080/v1';

const endpoints = {
  alltrends: () => `${api}/alltrends`,
  alltrendsTweets: (max_id) => {
    max_id = max_id == undefined ? '' : `?max_id=${max_id}`;
    return `${api}/alltrends/tweets${max_id}`;
  },
  alltrendsArticles: (max_id) => {
    max_id = max_id == undefined ? '' : `?max_id=${max_id}`;
    return `${api}/alltrends/articles${max_id}`;
  },
  trend: (name) => `${api}/trend/${name}`,
  trendTweets: (name, max_id) => {
    max_id = max_id == undefined ? '' : `?max_id=${max_id}`;
    return `${api}/trend/${name}/tweets${max_id}`;
  },
  trendArticles: (name, max_id) => {
    max_id = max_id == undefined ? '' : `?max_id=${max_id}`;
    return `${api}/trend/${name}/articles${max_id}`;
  }
};


function handleJSON(response) {
   return response.json();
}

/**
 * NetworkBus class handles all communications with the REST API.
 * @author Omar Chehab
 */
export class NetworkBus {

  /**
   * Requests and parses the trends from the REST API.
   * @author Omar Chehab
   */
  static fetchAllTrends(callback: (error, response: AllTrends) => void) {
    const endpoint = endpoints.alltrends();
    console.log(endpoint);
    if (DEBUG) {
      callback(undefined, new AllTrends(networkBusDebug.fetchAllTrends));
      return;
    }
    window['fetch'](endpoint)
      .then(handleJSON,  error => callback(error, undefined))
      .then(function(response: AllTrendsPacket) {
        response = new AllTrends(response);
        callback(undefined, response);
      });
  }

  /**
   * Requests and parses the content from the REST API.
   * @author Omar Chehab
   */
  static fetchAllTrendsTweets(callback: (error, response: ContentTweetsPacket) => void,
    max_id?: string) {
    const endpoint = endpoints.alltrendsTweets(max_id);
    console.log(endpoint);
    if (DEBUG) {
      callback(undefined, networkBusDebug.fetchAllTrendsTweets);
      return;
    }
    window['fetch'](endpoint)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response: ContentTweetsPacket) {
        callback(undefined, response);
      });
  }

  /**
   * Requests and parses the content from the REST API.
   * @author Omar Chehab
   */
  static fetchAllTrendsArticles(callback: (error, response: ContentArticlesPacket) => void,
    max_id?: string) {
    const endpoint = endpoints.alltrendsArticles(max_id);
    console.log(endpoint);
    if (DEBUG) {
      callback(undefined, networkBusDebug.fetchAllTrendsArticles);
      return;
    }
    window['fetch'](endpoint)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response: ContentArticlesPacket) {
        callback(undefined, response);
      });
  }

  /**
   * Requests and parses the specific trends from the REST API.
   * @author Omar Chehab
   */
  static fetchTrend(callback: (error, response: Trend) => void,
    name: string) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trend(name);
    console.log(endpoint);
    if (DEBUG) {
      callback(undefined, new Trend(networkBusDebug.fetchTrend));
      return;
    }
    window['fetch'](endpoint)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response: TrendPacket) {
        response = new Trend(response);
        callback(undefined, response);
      });
  }

  static fetchTrendTweets(callback: (error, response: ContentTweetsPacket) => void,
    name: string, max_id?: string) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trendTweets(name, max_id);
    console.log(endpoint);
    if (DEBUG) {
      callback(undefined, networkBusDebug.fetchTrendTweets);
      return;
    }
    window['fetch'](endpoint)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response: ContentTweetsPacket) {
        callback(undefined, response);
      });
  }

  static fetchTrendArticles(callback: (error, response: ContentArticlesPacket) => void,
    name: string, max_id?: string) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trendArticles(name, max_id);
    console.log(endpoint);
    if (DEBUG) {
      callback(undefined, networkBusDebug.fetchTrendArticles);
      return;
    }
    window['fetch'](endpoint)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response: ContentArticlesPacket) {
        callback(undefined, response);
      });
  }
}
