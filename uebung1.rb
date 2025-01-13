# Aufgabe 1: Ganzzahlige Teiler von 1 bis 100 ausgeben
puts "-------Augabe 1------"
(1..100).each do |nummer|
  teiler = (1..nummer).select { |div| nummer % div == 0 }
  teiler.each { |div| puts "#{nummer} -> #{div}" }
end

# Aufgabe 2: String-Klasse um printSpace erweitern
puts "-------Augabe 2------"
class String
  def printSpace
    puts self.chars.join(' ')
  end
end

# Testaufruf
"Hallo".printSpace

# Aufgabe 3: Klasse Produkt erstellen
puts "-------Augabe 3------"
class Produkt
  attr_accessor :name, :artikelnummer, :preis, :bild_url

  def initialize(name, artikelnummer, preis, bild_url)
    @name = name
    @artikelnummer = artikelnummer
    @preis = preis
    @bild_url = bild_url
  end

  def to_s
    "Name: #{@name}, Artikelnummer: #{@artikelnummer}, Preis: #{@preis} EUR, Bild URL: #{@bild_url}"
  end
end

# Beispielerzeugung eines Produkts
produkt1 = Produkt.new("produkt1", "1234", 100.99, "https://test.com")
produkt2 = Produkt.new("produkt2", "2345", 49.99, "https://test.com")
puts produkt1

# Aufgabe 4: Klasse Warenkorb
puts "-------Augabe 4------"
class Warenkorb
  def initialize
    @produkte = {}
  end

  def add_product(produkt)
    if @produkte.key?(produkt)
      @produkte[produkt] += 1
    else
      @produkte[produkt] = 1
    end
  end

  def get_products
    @produkte
  end

  def total_price
    @produkte.sum { |produkt, anzahl| produkt.preis * anzahl }
  end
end

puts "-------Augabe 5------"
# Warenkorb erstellen und Produkte hinzufügen
warenkorb = Warenkorb.new
warenkorb.add_product(produkt1)
warenkorb.add_product(produkt2)

# Produkte und Gesamtpreis ausgeben
puts "Produkte im Warenkorb:"
warenkorb.get_products.each do |produkt, anzahl|
  puts "#{produkt} - Anzahl: #{anzahl}"
end

puts "Gesamtpreis: #{warenkorb.total_price} EUR"

# Produkt 1 erneut hinzufügen
warenkorb.add_product(produkt1)

# Produkte und neuen Gesamtpreis ausgeben
puts "Produkte im Warenkorb nach erneutem Hinzufügen:"
warenkorb.get_products.each do |produkt, anzahl|
  puts "#{produkt} - Anzahl: #{anzahl}"
end

puts "Neuer Gesamtpreis: #{warenkorb.total_price} EUR"