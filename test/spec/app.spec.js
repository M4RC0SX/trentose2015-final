/* Remember that blanket will only work with brackets live preview */
/* Try to maximise the coverage of the SantaModel object */

describe("Santa", function () {

    it("should give the first item of the list", function () {
        SantaModel.init([1,2,3,4]);
        expect(SantaModel.getCurrentRequest()).toBe(1);
    });

    it("should give the second item of the list after calling the function next()", function () {
        SantaModel.init([1,2,3,4]);
        SantaModel.next();
        expect(SantaModel.getCurrentRequest()).toBe(2);
    });

    it("should give undefined if the list is end", function () {
        SantaModel.init([1]);
        SantaModel.next();
        expect(SantaModel.getCurrentRequest()).toBeUndefined();
    });

    it("should tell if the pack is correct", function () {
        SantaModel.init([{answer:1}]);
        expect(SantaModel.pack(1)).toBe(1);
    });

    it("should tell if the pack is wrong", function () {
        SantaModel.init([{answer:1}]);
        expect(SantaModel.pack(2)).toBe(0);
    });

});
