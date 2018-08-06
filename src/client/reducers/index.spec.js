import index from './index'

describe('Reducer', () => {
    
    it('should handle initial state undefined', () => {
        expect(index(undefined,{ type: '', id: 1 }).activeSeatModal).toEqual(null)
    })  

    it('should handle activeSeatModal', () => {
        let obj1 =  {activeSeatModal:null};
        expect(index(obj1,{ type: 'OPEN_SEAT_MODAL', id: 1 }).activeSeatModal).toEqual(1)
    })    

    it('should handle activeTransactionModal', () => {
        let obj1 =  {activeTransactionModal:null};
        expect(index(obj1,{ type: 'OPEN_TRANSACTION_MODAL', message:"Hello" }).activeTransactionModal).toEqual("Hello")
    }) 

    it('should handle detailsModalReducer', () => {
        let obj1 =  {detailsModalReducer:null};
        expect(index(obj1,{ type: 'OPEN_DETAILS_MODAL', data:{} }).detailsModalReducer).toEqual({})
    }) 

})
