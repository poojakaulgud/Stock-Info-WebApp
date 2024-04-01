from flask import Flask, request, jsonify
from flask_cors import CORS
import finnhub
from datetime import datetime
import requests
from dateutil.relativedelta import relativedelta

finnhub_client = finnhub.Client(api_key="cn0rpthr01quegsk3600cn0rpthr01quegsk360g")
polygon_key='pt2292F4rhnCRSfbEE5ot0QRFy0gvwMM'


app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)
 

@app.route('/')
def hello():
    return app.send_static_file('index.html')

@app.route('/companyData/<sts>', methods =['GET'])
def sendCompanyData(sts):
    # sts=user_input
    print(sts)
    company_data = finnhub_client.company_profile2(symbol=sts)
    # print(company_data)
    return jsonify(company_data)

@app.route('/stockSummary/<sts>', methods=['GET'])
def sendStockSummary(sts):
    # sts=request.json.get('STS')
    print(sts)
    stock_summary = finnhub_client.quote(sts)
    # print(stock_summary)
    return jsonify(stock_summary)

@app.route('/recommendationTrends/<sts>', methods=['GET'])
def sendRecommendationTrends(sts):
    # sts=request.json.get('STS')
    print(sts)
    recommendation_trends = finnhub_client.recommendation_trends(sts)
    # print('index0',recommendation_trends[0])
    return jsonify(recommendation_trends[0])

@app.route('/news/<sts>', methods=['GET'])
def sendNews(sts):
    # sts=request.json.get('STS')
    news_to = datetime.today().strftime('%Y-%m-%d')
    news_from = (datetime.now() - relativedelta(days=30)).strftime('%Y-%m-%d')
    news = finnhub_client.company_news(sts, _from=news_from, to=news_to)
    # print(news[0:5])
    news_data = []
    i=0
    while True:
        if(len(news_data)==5):
            break
        if(news[i]['image']!='' and news[i]['headline']!='' and news[i]['datetime']!='' and news[i]['url']!=''):
            news_data.append(news[i])
        i=i+1
    # print('here',news_data)
    return jsonify(news_data)

@app.route('/charts/<sts>', methods=['GET'])
def sendCharts(sts):
    # sts=request.json.get('STS')
    print(sts)
    api_multiplier = '1'
    api_timespan = 'day'
    api_from = (datetime.now() - relativedelta(months=6, days=1)).strftime('%Y-%m-%d')
    api_to = datetime.today().strftime('%Y-%m-%d')
    print('api_from',api_from)
    print('api_to',api_to)
    r = requests.get('https://api.polygon.io/v2/aggs/ticker/'+sts+'/range/1/day/'+api_from+'/'+api_to+'?adjusted=true&sort=asc&apiKey='+polygon_key)
    # https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&apiKey=pt2292F4rhnCRSfbEE5ot0QRFy0gvwMM
    temp = r.json()
    # print('temp',temp)
    results = temp['results']
    print('')
    # print(results)
    charts_data = {}
    array1 = []
    array2 = []
    array3 = []
    for object in results:
        array1.append((object['t'],object['c']))
        array2.append((object['t'],object['v']))
        array3.append(object['v'])
    # charts_data['TimeStamp'] = array1
    charts_data['Volume'] = array2
    charts_data['StockPrice'] = array1
    charts_data['CurrentDate'] = api_to
    charts_data['MaxVolume'] = max(array3)
    # print('charts_data',charts_data)
    return jsonify(charts_data)

if __name__ == '__main__':
    app.run(threaded=True, port=5000)