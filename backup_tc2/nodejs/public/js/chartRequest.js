function getChart() {
    var req = new XMLHttpRequest();
    req.open('GET', 'https://todaycorona.site/request/chart');
    req.setRequestHeader('Content-Type','application/json');
    req.send();
    req.addEventListener('load', function() {
        var res = JSON.parse(req.responseText);
        res = JSON.parse(res);
        console.log(res);
        var cnt1 = res.length;
        console.log(cnt1);
        var arr = new Array( new Array() , new Array());
        var ccc = 0; 
        for(var i = cnt1-6 ; i < cnt1 ; i++) {
            res[i]['internal_gam'] = res[i]['internal_gam'].replace('&nbsp;','');
            res[i]['internal_gam'] = res[i]['internal_gam'].replace('명','');
            res[i]['internal_gam'] = res[i]['internal_gam'].replace(',','');
            res[i]['internal_gam'] = Number(res[i]['internal_gam']);
            res[i]['internal_die'] = res[i]['internal_die'].replace('&nbsp;','');
            res[i]['internal_die'] = res[i]['internal_die'].replace('명','');
            res[i]['internal_die'] = res[i]['internal_die'].replace(',','');
            res[i]['internal_die'] = Number(res[i]['internal_die']);
            res[i]['internal_clear'] = res[i]['internal_clear'].replace('&nbsp;','');
            res[i]['internal_clear'] = res[i]['internal_clear'].replace('명','');
            res[i]['internal_clear'] = res[i]['internal_clear'].replace(',','');
            res[i]['internal_clear'] = Number(res[i]['internal_clear']);
            arr[ccc] = {
                internal_gam: res[i]['internal_gam'],
                internal_die: res[i]['internal_die'],
                internal_clear: res[i]['internal_clear'],
                date: res[i]['date']
            };
            ccc++;
            
        }
        console.log(res);
        var ctx = document.getElementById('chart').getContext('2d');
        var chart = new Chart(ctx, {
            type:'line',
            data:{
                labels:[arr[0]['date'],arr[1]['date'],arr[2]['date'],arr[3]['date'],arr[4]['date'],arr[5]['date']],
                datasets:[{
                    label:'국내 사망자',
                    type:'line',
                    fill:false,
                    lineTension:0,
                    pointRadius:1,
                    backgroundColor:'rgb(235,20,42)',
                    borderColor:'rgb(235,20,42)',
                    data:[arr[0]['internal_die'],arr[1]['internal_die'],arr[2]['internal_die'],arr[3]['internal_die'],arr[4]['internal_die'],arr[5]['internal_die']]
                }]
            },
            options:{
                legend:{
                    labels:{
                        fontColor:'black'
                    }
                },
                scales:{
                    yAxes:[{
                        stacked:true,
                        ticks:{
                            fontColor:'black'
                        }
                    }],
                    xAxes: [{
                        stacked:true,
                        ticks:{
                            fontColor:'black'
                        }
                    }]
                }
            }
        });
        var ctx1 = document.getElementById('chart1').getContext('2d');
        var chart1 = new Chart(ctx1, {
            type:'line',
            data:{
                labels:[arr[0]['date'],arr[1]['date'],arr[2]['date'],arr[3]['date'],arr[4]['date'],arr[5]['date']],
                datasets:[{
                    label:'국내 격리해제(완치)',
                    type:'line',
                    fill:false,
                    lineTension:0,
                    pointRadius:1,
                    backgroundColor:'rgb(60,82,242)',
                    borderColor:'rgb(60,82,242)',
                    data:[arr[0]['internal_clear'],arr[1]['internal_clear'],arr[2]['internal_clear'],arr[3]['internal_clear'],arr[4]['internal_clear'],arr[5]['internal_clear']]
                }]
            },
            options:{
                legend:{
                    labels:{
                        fontColor:'black'
                    }
                },
                scales:{
                    yAxes:[{
                        stacked:true,
                        ticks:{
                            fontColor:'black'
                        }
                    }],
                    xAxes: [{
                        stacked:true,
                        ticks:{
                            fontColor:'black'
                        }
                    }]
                }
            }
        });
        var ctx2 = document.getElementById('chart2').getContext('2d');
        var chart2 = new Chart(ctx2, {
            type:'line',
            data:{
                labels:[arr[0]['date'],arr[1]['date'],arr[2]['date'],arr[3]['date'],arr[4]['date'],arr[5]['date']],
                datasets:[{
                    label:'국내 감염자',
                    type:'line',
                    fill:false,
                    lineTension:0,
                    pointRadius:1,
                    backgroundColor:'rgb(255,159,114)',
                    borderColor:'rgb(255,159,114)',
                    data:[arr[0]['internal_gam'],arr[1]['internal_gam'],arr[2]['internal_gam'],arr[3]['internal_gam'],arr[4]['internal_gam'],arr[5]['internal_gam']]
                }]
            },
            options:{
                legend:{
                    labels:{
                        fontColor:'black'
                    }
                },
                scales:{
                    yAxes:[{
                        stacked:true,
                        ticks:{
                            fontColor:'black'
                        }
                    }],
                    xAxes: [{
                        stacked:true,
                        ticks:{
                            fontColor:'black'
                        }
                    }]
                }
            }
        });
        
        
    });
}
