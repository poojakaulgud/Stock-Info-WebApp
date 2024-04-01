path= 'http://127.0.0.1:5000/'
// window.onload = function(){
    var sts_string = document.getElementById("sts");
    console.log(sts_string)
    // sts_string.addEventListener("keypress", function (e) {
    //     console.log('HEREEEE!!!!!!');
    //     if (e.key === "Enter") {
    //         e.preventDefault();  
    //         getSTS('company');
    //     }
    // });
   

    function getSTS(){
        var sts = (document.getElementById("sts").value).toUpperCase();  
        console.log(sts);
        if(sts.length!==0){                    
        axios.get(`/companyData/${sts}`).then((response) => {                        
                console.log('Here');
                // console.log(response);
                var companyData = response.data;
                // console.log(companyData);
                
                if(JSON.stringify(companyData)==='{}'){
                    var newContent = document.getElementById('newContent');
                    newContent.style.display = 'none';
                    console.log('Object Empty') ;
                    const errorBlock = document.querySelector('.errorBlock');
                    errorBlock.style.display = 'block';
                } 
                else{
                    console.log('companyData',companyData);
                    // if(val==='company'){addCompanyData(companyData);}
                    addCompanyData(companyData);
                    showCompanyData();
                }
            }).catch((error) => {
                console.log(error);
                var newContent = document.getElementById('newContent');
                newContent.style.display = 'none';
                const errorBlock = document.querySelector('.errorBlock');
                errorBlock.style.display = 'block';
            });


            axios.get(`/stockSummary/${sts}`).then((response) => {                        
                console.log('Here');
                // console.log(response);
                var stockSummary = response.data;
                // console.log(stockSummary);
                
                if(JSON.stringify(stockSummary)==='{}'){
                    console.log('Object Empty') ;
                    const errorBlock = document.querySelector('.errorBlock');
                    errorBlock.style.display = 'block';
                } 
                else{
                    // console.clear();
                    console.log('stockSummary',stockSummary);
                    // if(val==='stocks'){addStockSummary(stockSummary,sts);}
                    // if(val==='stocks'){getRecommendationTrends();}       
                    addStockSummary(stockSummary,sts);
                    // getRecommendationTrends();                     
                }
            }).catch((error) => {
                console.log(error);
                var newContent = document.getElementById('newContent');
                newContent.style.display = 'none';
                const errorBlock = document.querySelector('.errorBlock');
                errorBlock.style.display = 'block';
            });

            axios.get(`/recommendationTrends/${sts}`).then((response) => {                        
                console.log('Here');
                // console.log(response);
                var recommendationTrends = response.data;
                // console.log(recommendationTrends);
                
                if(JSON.stringify(recommendationTrends)==='{}'){
                    console.log('Object Empty') ;
                    const errorBlock = document.querySelector('.errorBlock');
                    errorBlock.style.display = 'block';
                } 
                else{
                    console.log('recommendationTrends',recommendationTrends);
                    addRecommendationTrends(recommendationTrends);
                }
            }).catch((error) => {
                console.log(error);
            });


            axios.get(`/news/${sts}`).then((response) => {                        
                console.log('Here');
                // console.log(response);
                var news = response.data;
                // console.log(news);
                
                if(JSON.stringify(news)==='{}'){
                    console.log('Object Empty') ;
                    var mainContent = document.getElementById('mainContent');
                    mainContent.style.display = 'none';
                    const errorBlock = document.querySelector('.errorBlock');
                    errorBlock.style.display = 'block';
                } 
                else{
                    // console.clear();
                    console.log('news',news);
                    news_data=news.slice(0,5)
                    // if(val==='news'){addNews(news,sts);}  
                    addNews(news_data,sts);                      
                }
            }).catch((error) => {
                console.log(error);
                var newContent = document.getElementById('newContent');
                newContent.style.display = 'none';
                const errorBlock = document.querySelector('.errorBlock');
                errorBlock.style.display = 'block';
            });

            // if(flag){
            axios.get(`/charts/${sts}`, { STS: sts }).then((response) => {                        
                console.log('Here');
                // console.log(response);
                var charts = response.data;
                // console.log(charts);
                
                if(JSON.stringify(charts)==='{}'){
                    console.log('Object Empty') ;
                    const errorBlock = document.querySelector('.errorBlock');
                    errorBlock.style.display = 'block';
                } 
                else{
                    console.log('charts',charts);
                    // console.log('charts[0]',charts)
                    // if(val==='charts'){addStockPriceChart(sts,charts);}
                    addStockPriceChart(sts,charts);
                }
            }).catch((error) => {
                console.log(error);
                var newContent = document.getElementById('newContent');
                newContent.style.display = 'none';
                const errorBlock = document.querySelector('.errorBlock');
                errorBlock.style.display = 'block';
            });
            // }
            
        }
    }

    
    
    

    function addCompanyData(companyData){
                   
        document.getElementById("cLogo").src=companyData.logo;
        document.getElementById("cName").innerHTML=companyData.name;
        document.getElementById("cTicker").innerHTML=companyData.ticker;
        document.getElementById("cExchange").innerHTML=companyData.exchange;
        document.getElementById("cDate").innerHTML=companyData.ipo;
        document.getElementById("cCategory").innerHTML=companyData.finnhubIndustry;
        
    }

    function showCompanyData(){
        document.querySelector('.StockSummary').style.display = 'none';
        document.querySelector('.Charts').style.display = 'none';
        document.querySelector('.News').style.display = 'none';
        const errorBlock = document.querySelector('.errorBlock');
        errorBlock.style.display = 'none';
        var newContent = document.getElementById("newContent")
        newContent.style.display = 'block';
        var navBar = document.getElementById("navBar")
        navBar.style.display = 'block';     
        var mainContent = document.getElementById("mainContent");
        mainContent.style.display = 'block';
        var company = document.querySelector('.Company');
        company.style.display = 'block';
        document.getElementById('company').classList.add("active");
        document.getElementById('charts').classList.remove("active");
        document.getElementById('stockSummary').classList.remove("active");
        document.getElementById('news').classList.remove("active");
    }

    
    function addNews(news, sts){
        
        document.getElementById("newsImg1").src=news[0].image;
        document.getElementById("newsHeading1").innerHTML=news[0].headline;
        document.getElementById("newsDate1").innerHTML=getDate(news[0].datetime);
        document.getElementById("newsLink1").href=news[0].url;    

        document.getElementById("newsImg2").src=news[1].image;
        document.getElementById("newsHeading2").innerHTML=news[1].headline;
        document.getElementById("newsDate2").innerHTML=getDate(news[1].datetime);
        document.getElementById("newsLink2").href=news[1].url;    

        document.getElementById("newsImg3").src=news[2].image;
        document.getElementById("newsHeading3").innerHTML=news[2].headline;
        document.getElementById("newsDate3").innerHTML=getDate(news[2].datetime);
        document.getElementById("newsLink3").href=news[2].url;    

        document.getElementById("newsImg4").src=news[3].image;
        document.getElementById("newsHeading4").innerHTML=news[3].headline;
        document.getElementById("newsDate4").innerHTML=getDate(news[3].datetime);
        document.getElementById("newsLink4").href=news[3].url;   

        document.getElementById("newsImg5").src=news[4].image;
        document.getElementById("newsHeading5").innerHTML=news[4].headline;
        document.getElementById("newsDate5").innerHTML=getDate(news[4].datetime);
        document.getElementById("newsLink5").href=news[4].url;    

        
    }

    function showNews(){
        document.querySelector('.Company').style.display = 'none';
        document.querySelector('.Charts').style.display = 'none';
        document.querySelector('.StockSummary').style.display = 'none';
        const errorBlock = document.querySelector('.errorBlock');
        errorBlock.style.display = 'none';
        var newContent = document.getElementById("newContent")
        newContent.style.display = 'block';
        var navBar = document.getElementById("navBar")
        navBar.style.display = 'block';   
        var mainContent = document.getElementById("mainContent");
        mainContent.style.display = 'block';
        var StockSummary = document.querySelector('.News');
        StockSummary.style.display = 'block';
        document.getElementById('news').classList.add("active");
        document.getElementById('stockSummary').classList.remove("active");
        document.getElementById('company').classList.remove("active");
        document.getElementById('charts').classList.remove("active");
    }

    function addStockSummary(stockSummary, sts){
                 
        document.getElementById("sTicker").innerHTML=sts.toUpperCase();
        document.getElementById("sTradingDay").innerHTML= getDate(stockSummary.t);
        document.getElementById("sCP").innerHTML=stockSummary.pc;
        document.getElementById("sOP").innerHTML=stockSummary.o;
        document.getElementById("sHP").innerHTML=stockSummary.h;
        document.getElementById("sLP").innerHTML=stockSummary.l;
        document.getElementById("sChange").innerHTML=stockSummary.d;
        document.getElementById("changeImg").src=getArrow(stockSummary.d);
        document.getElementById("sChangePercent").innerHTML=stockSummary.dp;
        document.getElementById("changePercentImg").src=getArrow(stockSummary.dp);
        
    }

    function showStockSummary(){
        document.querySelector('.Company').style.display = 'none';
        document.querySelector('.Charts').style.display = 'none';
        document.querySelector('.News').style.display = 'none';
        const errorBlock = document.querySelector('.errorBlock');
        errorBlock.style.display = 'none';
        var newContent = document.getElementById("newContent")
        newContent.style.display = 'block';
        var navBar = document.getElementById("navBar")
        navBar.style.display = 'block'; 
        var mainContent = document.getElementById("mainContent");
        mainContent.style.display = 'block';
        var StockSummary = document.querySelector('.StockSummary');
        StockSummary.style.display = 'block';
        document.getElementById('stockSummary').classList.add("active");
        document.getElementById('company').classList.remove("active");
        document.getElementById('charts').classList.remove("active");
        document.getElementById('news').classList.remove("active");      
    }

    function getDate(timestamp){
        const myDate = new Date(timestamp * 1000);
        // console.log('myDate',myDate);
        var y = myDate.getFullYear(); 
        // console.log('y',y);
        var m = myDate.toLocaleString('default', { month: 'long' });; 
        // console.log('m',m);
        var d = myDate.getDate(); 
        // console.log('d',d);
        // console.log('date',d + m + ',' + y)
        return d.toString() + ' ' + m + ', ' + y
    }

    function getArrow(value){
        console.log('typeof',typeof value);
        if(value<=0){
            console.log('neg');
            return 'img/RedArrowDown.png';
        }
        else{
            console.log('pos');
            return 'img/GreenArrowUp.png';
        }
    }

    function addRecommendationTrends(recommendationTrends){
       
        document.getElementById('strongSell').innerHTML=recommendationTrends.strongSell;
        document.getElementById('sell').innerHTML=recommendationTrends.sell;
        document.getElementById('hold').innerHTML=recommendationTrends.hold;
        document.getElementById('buy').innerHTML=recommendationTrends.buy;
        document.getElementById('strongBuy').innerHTML=recommendationTrends.strongBuy;
        
    }
    
    

       function showCharts(){
        document.querySelector('.Company').style.display = 'none';
        document.querySelector('.StockSummary').style.display = 'none';
        document.querySelector('.News').style.display = 'none';
        const errorBlock = document.querySelector('.errorBlock');
        errorBlock.style.display = 'none';
        var newContent = document.getElementById("newContent")
        newContent.style.display = 'block';
        var navBar = document.getElementById("navBar")
        navBar.style.display = 'block';   
        var mainContent = document.getElementById("mainContent");
        mainContent.style.display = 'block';
        var Charts = document.querySelector('.Charts');
        Charts.style.display = 'block';
        document.getElementById('stockSummary').classList.remove("active");
        document.getElementById('company').classList.remove("active");
        document.getElementById('charts').classList.add("active");
        document.getElementById('news').classList.remove("active");   
    }

    function addStockPriceChart(sts,charts){
        Highcharts.stockChart('stockPriceChart', {
                        rangeSelector: {
                            selected: 4,
                            inputEnabled: false,
                            buttons: [{
                                type: 'day',
                                count: 7,
                                text: '7d'
                            }, {
                                type: 'day',
                                count: 15,
                                text: '15d'
                            },{
                                type: 'month',
                                count: 1,
                                text: '1m',
                            }, {
                                type: 'month',
                                count: 3,
                                text: '3m'
                            }, {
                                type: 'month',
                                count: 6,
                                text: '6m'
                            }]
                        },

                        chart: {
                            zoomType: 'xy',
                            height: 500
                        },

                        title: {
                            text: 'Stock Price '+sts+ ' '+charts['CurrentDate']
                        },

                        subtitle: {
                            text: '<a href="https://polygon.io/" target="_blank">Source: Polygon.io</a>',
                            style: {
                                textDecoration: 'underline',
                                color: "#800080"
                            }
                        },

                        // xAxis: {
                        //     series: charts['Timestamp'],},

                        yAxis: [{ 
                            opposite: false,
                            title: {
                                text: 'Stock Price',
                                style: {
                                    color: "#000000",
                                    fontSize: 15
                                }
                            },
                            tickAmount: 6,
                            // tickPixelInterval: 200
                        }, { 
                            title: {
                                text: 'Volume',
                                style: {
                                    color: '#000000',
                                    fontSize: 15
                                }
                            },
                            // max: max_var,
                            min: 0,
                            max: (2*charts['MaxVolume']),
                            tickAmount: 6,
                        },
                    ],

                        navigator: {
                            series: {
                                accessibility: {
                                    exposeAsGroupOnly: true
                                }
                            }
                        },

                        series: [
                        {
                            name: 'Stock Price',
                            data: charts['StockPrice'],
                            type: 'area',
                            // yAxis: 0,
                            // zIndex: 1,
                            // stack: 1,
                            threshold: null,
                            tooltip: {
                                valueDecimals: 2
                            },
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            }
                        },
                        {
                            name: 'Volume',
                            data: charts['Volume'],
                            type: 'column',
                            pointPlacement: 'on',
                            color: '#000000',
                            yAxis: 1,
                            pointWidth: 3,
                            // zIndex: 2,
                            threshold: null,

                        },
                    ]
                        });
    }

    function clearFunc(){
        const errorBlock = document.querySelector('.errorBlock');
        errorBlock.style.display = 'none';
        document.getElementById("sts").value = '';
        document.querySelector('.Company').style.display = 'none';
        document.querySelector('.StockSummary').style.display = 'none';
        document.querySelector('.Charts').style.display = 'none';
        document.querySelector('.News').style.display = 'none';
        var newContent = document.getElementById("newContent")
        newContent.style.display = 'none';
        var navBar = document.getElementById("navBar")
        navBar.style.display = 'none';        
    }


