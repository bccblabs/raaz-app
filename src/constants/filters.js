export default Filters = [
  {
    name: 'Basics',
    filters: [
      {name: 'Price Range', category: 'prices'},
      {name: 'Mileage Range', category: 'mileage'},
      {name: 'New/Used', category: 'condition', value: ['Used', 'New', 'Certified Pre-Owned']},
      {
        name: 'Body Types',
        category: 'bodyType',
        value: ['Sedan', 'Convertible', 'Coupe', 'SUV', 'Hatchback', 'Truck', 'Wagon']
      },
    ]
  },
  {
    name: 'Engine',
    filters: [
      {
        name: "Compressor",
        category: "compressorType",
        value: ['turbocharger', 'supercharger', 'naturally aspirated']
      },
      {
        name: "Cylinders",
        category: "cylinder",
      },
      {
        name: "Horsepower (hp)",
        category: "horsepower",
      },
      {
        name: "Torque (lb/ft)",
        category: "torque",
      },
    ]
  },
  {
    name: 'Mechanical',
    filters: [
      {
        name: "Drive Trains",
        category: "drivetrain",
        value: ['front wheel drive', 'rear wheel drive', 'all wheel drive']
      },
      {
        name: "Transmission",
        category: "transmission",
        value: ['automatic', 'manual']
      },
      {
        name: 'Suspension',
        category: 'equipments',
        value: [
          "Active Suspension",
          "Double Wishbone Rear Suspension",
          "Driver Adjustable Suspension",
          "Macpherson Strut Front Suspension",
          "Self Leveling Suspension",
        ]
      },
      {
        name: 'Brakes',
        category: 'equipments',
        value: [
          "Electronic Brakeforce Distribution",
          "Braking Assist",
        ]
      },
      {
        name: 'Differential',
        category: 'equipments',
        value: [
          "Center Differential",
          "Limited Slip Center Differential",

        ]
      }
    ]
  },
  {
    name: 'Options',
    filters: [
      {
        name: "Connectivity & Telematics",
        category: 'equipments',
        value: [
          "Auxiliary Audio Input/USB Port",
          "Bluetooth",
          "Satellite Communications",
          "Voice Activated Navigation System",
        ]
      },
      {
        name: "Safety",
        category: "equipments",
        value: [
          "Front Video Monitor",
          "Pre-Collision Safety System",
          "Rear View Camera",
          "Speed Sensing Windshield Wipers",
          "Stability Control",
          "Traction Control",
        ]
      },
      {
        name: 'Audio System',
        category: 'equipments',
        value: [
          "Satellite Radio System",
          "Subwoofer",
          "Surround Sound Audio",
        ]
      },

      {
        name: 'Lights',
        category: 'equipments',
        value: [
          "Automatic On/Off Headlights",
          "Automatic Delay Off Headlights",
          "Exterior Entry Lighting",
          "LED Headlights",
          "Self-Leveling Headlights",
          "Xenon High Intensity Discharge Headlights",
        ]
      },

      {
        name: "Convenience",
        category: "equipments",
        value: [
          "Automatic Engine Stop/Start",
          "Power Glass Sunroof",
          "Speed Sensitive Volume Control",
          "Heated Exterior Mirrors",
          "Reverse Tilt Exterior Mirror",
          "Privacy Glass",
        ]
      },
      {
        name: 'Trim Material',
        category: 'equipments',
        value: [
          "Leather and Chrome Shift Knob Trim",
        ]
      },
      {
        name: 'Seats Adjustment',
        category: 'equipments',
        value: [
          "Driver's Seat Memory",
          "Heated Driver's Seat",
          "Heated Passenger Seat",
          "Height Adjustable Driver's Seat",
          "Height Adjustable Passenger Seat",
          "Leather Seating",
          "Power Driver's Seat",
          "Power Front Passenger Seat",
          "Power Driver's Seat Lumbar Adjustment",
          "Front Bucket Seats",
          "Front Sport Seats",
        ]
      },
    ]
  }
]
