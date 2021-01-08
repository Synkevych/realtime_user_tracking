User.create([{ name: RandomNameGenerator.new(RandomNameGenerator::GOBLIN).compose(2),
    ip_address: '192.168.0.1',
    device: 'iphone'
  }, { name: RandomNameGenerator.new(RandomNameGenerator::GOBLIN).compose(2),
    ip_address: '192.168.0.2',
    device: 'android'
  }, { name: RandomNameGenerator.new(RandomNameGenerator::GOBLIN).compose(2),
    ip_address: '192.168.0.3',
    device: 'unknown' }
])
