import React, { useState } from "react";
import { Container, Card, Row, Text, NextUIProvider } from "@nextui-org/react";
import { Spacer, Button } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
const details = [
  {
    id: 0,
    count: 0,
    title: "Orange",
    img: "/images/fruit-1.jpeg",
    price: 5.5
  },
  {
    id: 1,
    count: 0,
    title: "Tangerine",
    img: "/images/fruit-2.jpeg",
    price: 3.0
  },
  {
    id: 2,
    count: 0,
    title: "Raspberry",
    img: "/images/fruit-3.jpeg",
    price: 10.0
  }
];

let maal = {};
maal["id"] = 45;
maal["Name"] = "Arghya";
var json = JSON.stringify(maal);

export default function Dashboard() {
  const navigate = useNavigate();
  const [depth, setDepth] = useState(details);
  var [billdata, setBilldata] = useState();

  const [total, setTotal] = useState();

  const cal = () => {
    const val =
      depth[0].price * depth[0].count +
      depth[1].price * depth[1].count +
      depth[2].price * depth[2].count;
    setTotal(val);
  };

  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "INR 5.50"
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "INR 3.00"
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "INR 10.00"
    }
  ];

  React.useEffect(() => {
    window.addEventListener("onCheckoutPaymentSuccess", function (event) {
      console.log(event.detail.id);
      Notiflix.Report.success("Payment Successful", event.detail.id, "Okay");
    });
    window.addEventListener("onCheckoutFailure", function (event) {
      Notiflix.Report.failure("Payment Faild", "Okay");
    });
    window.addEventListener("onCheckoutPaymentFailure", (event) => {
      //console.log(event.detail.error);
      //alert(event.detail);
    });
  }, []);

  React.useEffect(() => {
    cal();
  }, [depth]);

  return (
    <NextUIProvider>
      <Grid.Container
        gap={2}
        style={{
          backgroundColor: "black"
        }}
      >
        <Grid xs={5}>
          <Text css={{ color: "white" }} h2>
            Fruits.com
          </Text>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2} justify="flex-start">
        {list.map((item, index) => (
          <Grid xs={6} sm={4} key={index}>
            <Card
              hoverable
              //color="success"
            >
              <Card.Header
                justify="flex-start"
                css={{
                  zIndex: 0
                }}
              >
                <Row wrap="wrap" justify="space-between">
                  <Text b>{item.title}</Text>
                  {depth[index].count != 0 ? (
                    <Text color="error" h4>
                      {" "}
                      x{depth[index].count}{" "}
                    </Text>
                  ) : (
                    ""
                  )}
                  <Text css={{ color: "#000000", fontWeight: "$semibold" }}>
                    {item.price}
                  </Text>
                </Row>
              </Card.Header>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  objectFit="cover"
                  src={"https://nextui.org" + item.img}
                  width="100%"
                  height={140}
                  alt={item.title}
                />
              </Card.Body>
              <Card.Footer
                justify="flex-start"
                css={{
                  zIndex: 0
                }}
              >
                <Row wrap="wrap" justify="space-between">
                  <Button
                    auto
                    color="success"
                    rounded
                    bordered
                    onClick={(e) => {
                      cal();
                      const c = depth[index].count + 1;
                      setDepth(
                        depth.map((deep) =>
                          deep.id === index
                            ? { ...deep, count: c }
                            : { ...deep }
                        )
                      );
                    }}
                  >
                    ADD
                  </Button>

                  <Button
                    auto
                    disabled={depth[index].count === 0 ? true : false}
                    color="error"
                    rounded
                    bordered
                    onClick={(e) => {
                      cal();
                      const c = depth[index].count - 1;
                      setDepth(
                        depth.map((deep) =>
                          deep.id === index
                            ? { ...deep, count: c }
                            : { ...deep }
                        )
                      );
                    }}
                  >
                    Remove
                  </Button>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
        <Spacer y={2} />
      </Grid.Container>
      <Container justify="center">
        <Row
          justify="center"
          align="center"
          css={{
            zIndex: 0
          }}
        >
          <Button
            bordered
            flat
            disabled={total === 0 ? true : false}
            color="warning"
            auto
            onClick={() => {
              window["payment"](total, "Arghya", "rapyd@gmail.com", depth);
            }}
          >
            Pay {total === 0 ? "" : `INR ${total}`}
          </Button>
        </Row>
        <div id="rapyd-checkout"></div>
      </Container>
    </NextUIProvider>
  );
}
