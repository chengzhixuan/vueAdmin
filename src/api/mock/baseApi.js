import Mock from 'mockjs'
// 'name|min-max': value
// 'name|count': value
// 'name|min-max.dmin-dmax': value
// 'name|min-max.dcount': value
// 'name|count.dmin-dmax': value
// 'name|count.dcount': value
// 'name|+step': value
Mock.mock('/test/login', {
    code: 200,
    message: '成功',
    data: {
        'userName|1': Mock.Random.cname(),
        'token': /\d{10,20}/,
        'authList': []
    }
})
Mock.mock('/test/getPower', {
    code: 200,
    message: '成功',
    'data|0': [Mock.Random.word(10)],
})