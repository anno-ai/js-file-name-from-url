const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const assert = chai.assert
const { getFileNameFromUrl } = require('../lib/index')

describe('getFileNameFromUrl', () => {
  it('should return undefined if not a valid url', function () {
    const { name, source } = getFileNameFromUrl(' ')
    assert.isUndefined(name)
    assert.isUndefined(source)
  })

  it('should return name and source if it is a valid url with filename', function () {
    const url = 'https://anno.ai/image.jpg?qs=100'
    const { name, source } = getFileNameFromUrl(url)
    assert.equal(name, 'image.jpg')
    assert.equal(source, url)
  })

  it('should return a url file name that is decoded', function () {
    const url = 'https://upload.wikimedia.org/wikipedia/commons/4/43/2P129_TEL_9K79_Tochka_missile_system%2C_%D0%9F%D1%83%D1%81%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F_%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0_2%D0%9F129_%D1%80%D0%B0%D0%BA%D0%B5%D1%82%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BA%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81%D0%B0_9%D0%9A79_%D0%A2%D0%BE%D1%87%D0%BA%D0%B0%2C_Artillery_museum%2C_Saint-Petersburg_pic2.JPG'
    const { name } = getFileNameFromUrl(url)
    assert.equal(name, '2P129_TEL_9K79_Tochka_missile_system,_Пусковая_установка_2П129_ракетного_комплекса_9К79_Точка,_Artillery_museum,_Saint-Petersburg_pic2.JPG')
  })

  it('should return a url file name that is equal to 255 characters if too long', function () {
    const url = 'https://upload.wikimedia.org/wikipedia/commons/4/43/100dxkopajnkhpswwvpaazpharpufbynxhzfodiqgesbcetvpvtnpsdxxinuklxppbbqbzpizmpjkqsekeuuvtusknbkyjanlclgwugplyhzyvpapahbumgznzeqbiazlixtasclhxzjbxbibmqrmuplweqnnqembjfntfzpsgsedigatzsedzqhivecjxdbvlpwypulssysimtqfdqjjlhihelokvevvfvsyhgiyzlhodycfxowwevdqdnpxihkbpfu200.JPG'
    const { name } = getFileNameFromUrl(url)
    assert.equal(name.length, 255)
  })

  it('should return a url hash as the name if it is a valid url without filename', function () {
    const url = 'https://anno.ai/?qs=100'
    const { name, source } = getFileNameFromUrl(url)
    assert.equal(name, 'yx8E7v3u3/')
    assert.equal(source, url)
  })
})
