// Real Car Images from Internet - AutoZone Egypt
const carImages = {
    toyota: {
        corolla: [
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
            'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
        ],
        camry: [
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800'
        ],
        rav4: [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
        ],
        yaris: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
        ]
    },
    hyundai: {
        elantra: [
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
            'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800'
        ],
        tucson: [
            'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
        ],
        accent: [
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
        ]
    },
    kia: {
        cerato: [
            'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
        ],
        sportage: [
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
            'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
        ],
        picanto: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
        ]
    },
    nissan: {
        sunny: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
        ],
        sentra: [
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'
        ],
        'x-trail': [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
        ]
    },
    chevrolet: {
        cruze: [
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
        ],
        aveo: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
        ],
        captiva: [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
        ]
    },
    bmw: {
        '3-series': [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
            'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800'
        ],
        '5-series': [
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
        ],
        x3: [
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
        ],
        x5: [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
        ]
    },
    mercedes: {
        'c-class': [
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
        ],
        'e-class': [
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'
        ],
        glc: [
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
        ]
    },
    peugeot: {
        '301': [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
        ],
        '308': [
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'
        ],
        '2008': [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
        ]
    }
};

// Car Parts Images from Internet
const partsImages = {
    engine: {
        'oil-filter': [
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600',
            'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600'
        ],
        'air-filter': [
            'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600',
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600'
        ],
        'spark-plugs': [
            'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600'
        ],
        'timing-belt': [
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600'
        ]
    },
    brakes: {
        'brake-pads': [
            'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600',
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600'
        ],
        'brake-discs': [
            'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600'
        ]
    },
    suspension: {
        'shock-absorbers': [
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600'
        ],
        'coil-springs': [
            'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600'
        ]
    },
    electrical: {
        'battery': [
            'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600',
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600'
        ],
        'alternator': [
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600'
        ],
        'starter': [
            'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600'
        ]
    },
    body: {
        'bumper': [
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600'
        ],
        'mirror': [
            'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600'
        ],
        'headlight': [
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600'
        ]
    }
};

// Helper function to get car image
function getCarImage(brand, model) {
    if (carImages[brand] && carImages[brand][model]) {
        return carImages[brand][model][0];
    }
    return 'assets/images/cars/default-car.jpg';
}

// Helper function to get part image
function getPartImage(category, partType) {
    if (partsImages[category] && partsImages[category][partType]) {
        return partsImages[category][partType][0];
    }
    return 'assets/images/parts/default-part.jpg';
}

// Export for global access
window.carImages = carImages;
window.partsImages = partsImages;
window.getCarImage = getCarImage;
window.getPartImage = getPartImage;