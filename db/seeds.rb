# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
users = User.create([
  { name:RandomNameGenerator.new(RandomNameGenerator::GOBLIN).compose(2),
    ip_address: "192.168.0.1",
    device: "iphone"
  },
  { name: RandomNameGenerator.new(RandomNameGenerator::GOBLIN).compose(2),
    ip_address: "192.168.0.2",
    device: "android"
  },
  { name: RandomNameGenerator.new(RandomNameGenerator::GOBLIN).compose(2),
     ip_address: "192.168.0.3",
     device: "unknown"
  }
])
