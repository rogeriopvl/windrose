var expect = require('chai').expect;
var Windrose = require('../index.js');

describe('Windrose', function () {

    it('should have method getPoint', function (done) {
        expect(typeof Windrose.getPoint).to.equal('function');
        done();
    });

    it('should have method getDegrees', function (done) {
        expect(typeof Windrose.getDegrees).to.equal('function');
        done();
    });

    it('should return north when passing 0 degrees', function (done) {
        var res = Windrose.getPoint(0);
        expect(res).to.be.an('object');
        expect(res.symbol).to.equal('N');
        done();
    });

    it('should return North when passing 360 degrees', function (done) {
        var res = Windrose.getPoint(359.8);
        expect(res).to.be.an('object');
        expect(res.symbol).to.equal('N');
        done();
    });

    it('should return undefined when passing -1 degrees', function (done) {
        var res = Windrose.getPoint(-1);
        expect(res).to.be.an('undefined');
        done();
    });

    it('should return undefined when passing 361 degrees', function (done) {
        var res = Windrose.getPoint(361);
        expect(res).to.be.an('undefined');
        done();
    });

    it('should return 0 when passing North or N', function (done) {
        var res = Windrose.getDegrees('North');
        expect(res).to.be.a('number');
        expect(res).to.equal(0);

        var res2 = Windrose.getDegrees('N');
        expect(res2).to.be.a('number');
        expect(res2).to.equal(0);

        done();
    });
});
