User.create([{ name: Faker::Movies::LordOfTheRings.character,
    ip_address: '192.168.0.1',
    device: 'iphone'
  }, { name: Faker::Movies::LordOfTheRings.character,
    ip_address: '2.468.123.21',
    device: 'android'
  }, { name: Faker::Movies::LordOfTheRings.character,
    ip_address: '92.8.0.123',
    device: 'unknown' }
])
