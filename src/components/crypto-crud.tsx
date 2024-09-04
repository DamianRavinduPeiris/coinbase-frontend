import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit, Plus, Coins } from 'lucide-react'

interface Crypto {
  id: number
  name: string
  symbol: string
  price: number
}

export function CryptoCrud() {
  const [cryptos, setCryptos] = useState<Crypto[]>([
    { id: 1, name: "'Bitcoin'", symbol: "'BTC'", price: 30000 },
    { id: 2, name: "'Ethereum'", symbol: "'ETH'", price: 2000 },
  ])
  const [newCrypto, setNewCrypto] = useState<Crypto>({ id:0,name: "", symbol: "", price: 0 })
  const [editingId, setEditingId] = useState<number | null>(null)

  const addCrypto = () => {
    setCryptos([...cryptos, { ...newCrypto, id: Date.now() }])
    setNewCrypto({ id:0,name: "", symbol: "", price: 0 })
  }

  const updateCrypto = (id: number, updatedCrypto: Omit<Crypto, "'id'">) => {
    setCryptos(cryptos.map(crypto => crypto.id === id ? { ...crypto, ...updatedCrypto } : crypto))
    setEditingId(null)
  }

  const deleteCrypto = (id: number) => {
    setCryptos(cryptos.filter(crypto => crypto.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <Coins className="h-8 w-8 text-blue-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Coinbase</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Cryptocurrency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Name"
                value={newCrypto.name}
                onChange={(e) => setNewCrypto({ ...newCrypto, name: e.target.value })}
              />
              <Input
                placeholder="Symbol"
                value={newCrypto.symbol}
                onChange={(e) => setNewCrypto({ ...newCrypto, symbol: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Price"
                value={newCrypto.price}
                onChange={(e) => setNewCrypto({ ...newCrypto, price: parseFloat(e.target.value) })}
              />
              <Button onClick={addCrypto}>
                <Plus className="h-4 w-4 mr-2" /> Add Crypto
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cryptocurrencies</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cryptos.map((crypto) => (
                  <TableRow key={crypto.id}>
                    <TableCell>
                      {editingId === crypto.id ? (
                        <Input
                          value={crypto.name}
                          onChange={(e) => updateCrypto(crypto.id, { ...crypto, name: e.target.value })}
                        />
                      ) : (
                        crypto.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === crypto.id ? (
                        <Input
                          value={crypto.symbol}
                          onChange={(e) => updateCrypto(crypto.id, { ...crypto, symbol: e.target.value })}
                        />
                      ) : (
                        crypto.symbol
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === crypto.id ? (
                        <Input
                          type="number"
                          value={crypto.price}
                          onChange={(e) => updateCrypto(crypto.id, { ...crypto, price: parseFloat(e.target.value) })}
                        />
                      ) : (
                        `$${crypto.price.toFixed(2)}`
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === crypto.id ? (
                        <Button onClick={() => setEditingId(null)}>Save</Button>
                      ) : (
                        <Button variant="ghost" onClick={() => setEditingId(crypto.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" onClick={() => deleteCrypto(crypto.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}