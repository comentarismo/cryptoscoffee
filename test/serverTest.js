var request = require('supertest');
var should = require('should');
const url = require('url');

describe('server', function () {

    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    var server;
    beforeEach(function () {
        server = require('../server');
    });
    afterEach(function () {
        server.close();
    });

    it('should have valid API response on /news/operator/${operator}', function (done) {
        request(server)
            .get('/news/operator/newsbitcoin')
            .expect(200)
            .end(function (err,res) {
                should.exist(res.body);
                const text = JSON.parse(res.text);
                //Author
                //should.have.property('author',text[0].author);
                should.exist(text[0].author);
                should(text[0].author).be.a.String();
                //Categories
                should.exist(text[0].categories);
                should(text[0].categories).be.a.String().and.match(/cryptocurrency/);
                //countries
                should.exist(text[0].countries);
                should(text[0].countries).be.a.String().and.match(/usa/);
                //date
                should.exist(text[0].date);
                should(new Date(text[0].date)).be.a.Date();
                //genre
                should.exist(text[0].genre);
                should(text[0].genre).be.a.String().and.match(/cryptocurrency-taxes/);
                //id
                should.exist(text[0].id);
                should(text[0].id).be.a.String();
                //image
                should.exist(text[0].image);
                should(regex.test(text[0].image)).equal(true);
                //languages
                should.exist(text[0].languages);
                should(text[0].languages).be.a.String().and.match(/english/);
                //link
                should.exist(text[0].link);
                should(regex.test(text[0].link)).equal(true);

                //operator
                should.exist(text[0].operator);
                should(text[0].operator).be.a.String().and.match(/newsbitcoin/);
                //resume
                should.exist(text[0].resume);
                should(text[0].resume).be.a.String();
                //sentiment -Array
                should.exist(text[0].sentiment);
                should(text[0].sentiment).be.an.Array();
                //summary
                should.exist(text[0].summary);
                should(text[0].summary).be.a.String();
                //tags -Array
                should.exist(text[0].tags);
                should(text[0].tags).be.an.Array();
                //title
                should.exist(text[0].title);
                should(text[0].title).be.a.String();
                //titleurlize
                should.exist(text[0].titleurlize);
                should(text[0].titleurlize).be.a.String();
                //totalComments - int
                should.exist(text[0].totalComments);
                should(text[0].totalComments).be.a.Number();
                //updatedAt -Date
                should.exist(text[0].updatedAt);
                should(new Date(text[0].updatedAt)).be.a.Date();

                done()
            });
    });

});
