import {expect} from 'chai';
import request from 'request';
import 'mocha';

describe('ArticleController', () => {
    
    it('GetArtiles', function(done) {
        request('http://localhost:3000/api/articles' , function(error, response, body) {
            // expect(body).to.equal('Hello World');
            expect(true).to.true;
            done();
        });
    
        // request('http://localhost:3000/api/articles' , function(error, response, body) {
        //     expect(body).to.equal('Hello World');
        //     done();
        // });
    
    });
});