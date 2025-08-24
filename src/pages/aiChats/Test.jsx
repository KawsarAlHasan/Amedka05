import React, { useState } from 'react';
import { Card, Button, Input, message, Row, Col } from 'antd';
import { HeartOutlined, SearchOutlined } from '@ant-design/icons';

const productData = [
  {
    name: 'Kvidio Headphone 512',
    price: '$28.85',
    originalPrice: '$32.8',
    image: 'https://via.placeholder.com/150', // Example image, replace with actual image
  },
  {
    name: 'Kvidio Headphone 512',
    price: '$28.85',
    originalPrice: '$32.8',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Kvidio Headphone 512',
    price: '$28.85',
    originalPrice: '$32.8',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Kvidio Headphone 512',
    price: '$28.85',
    originalPrice: '$32.8',
    image: 'https://via.placeholder.com/150',
  },
];

const App = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearch = () => {
    message.info(`Searching for: ${searchText}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          className="w-3/4"
          placeholder="Type a message"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          onPressEnter={handleSearch}
        />
        <div className="flex items-center">
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Here are some winter jackets under $50</h3>
        <p className="text-gray-600">Would you like to filter by color or brand?</p>
      </div>

      <Row gutter={[16, 16]}>
        {productData.map((product, index) => (
          <Col key={index} span={6}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} />}
              actions={[
                <HeartOutlined key="heart" />,
                <Button type="link" className="text-blue-500">View</Button>,
              ]}
            >
              <Card.Meta
                title={product.name}
                description={
                  <>
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">{product.price}</span>
                      <span className="line-through text-gray-500">{product.originalPrice}</span>
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div className="flex justify-center mt-6">
        <Button
          type="default"
          icon={<SearchOutlined />}
          onClick={() => message.info('Searching for high-priced jackets')}
        >
          Find similar jackets in high price
        </Button>
      </div>
    </div>
  );
};

export default App;
