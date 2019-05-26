import {
    normalizeDataAsync,
    setLoadingSuccess,
    setEntities,
    setRootEntityList,
    loadFileAsync,
    setLoadingError,
} from './actions'

describe('normalizeDataAsync', () => {
    it("doesn't fail on empty data array", async () => {
        const dispatchMock = jest.fn()
        normalizeDataAsync([])(dispatchMock)
    })
    it('triggers correct actions on success', async () => {
        const dispatchMock = jest.fn()
        normalizeDataAsync([])(dispatchMock)
        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock.mock.calls[0][0]).toStrictEqual(setEntities({}))
        expect(dispatchMock.mock.calls[1][0]).toStrictEqual(
            setRootEntityList([])
        )
        expect(dispatchMock.mock.calls[2][0]).toStrictEqual(setLoadingSuccess())
    })
})

describe('loadFileAsync', () => {
    it('loads and parses correct JSON', () => {
        const dataString = '[]'
        const file = new File([dataString], 'filename')
        const dispatchMock = jest.fn()
        ;(global as any).FileReader = function(this: any) {
            this.readAsText = () => {
                this.onloadend()
            }
            this.result = dataString
            return this
        }

        loadFileAsync(file)(dispatchMock)

        expect(dispatchMock.mock.calls[1][0]).toStrictEqual(setEntities({}))
        expect(dispatchMock.mock.calls[2][0]).toStrictEqual(
            setRootEntityList([])
        )
    })
    it('triggers error action on incorrect JSON file', () => {
        const dataString = '['
        const file = new File([dataString], 'filename')
        const dispatchMock = jest.fn()
        ;(global as any).FileReader = function() {
            this.readAsText = () => {
                this.onloadend()
            }
            this.result = dataString
            return this
        }

        loadFileAsync(file)(dispatchMock)

        expect(dispatchMock.mock.calls[1][0]).toStrictEqual(
            setLoadingError('Unexpected end of JSON input')
        )
    })
    it('triggers error action on incorrect JSON file', () => {})
})
