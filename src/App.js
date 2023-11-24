import "./App.css";
// const baseUrl = process.env.REACT_APP_EC2_IP;

function App() {
  const iframeItems = [
    {
      src: `http://ec2-15-165-102-138.ap-northeast-2.compute.amazonaws.com:3000/d-solo/ce979670-fbbf-4f27-9a17-e16d14468274/odn-ec2-grafana-test?orgId=1&from=1672498800000&to=1704034799999&panelId=3`,
      title: "clock",
      className: "small",
    },
    {
      src: `http://ec2-15-165-102-138.ap-northeast-2.compute.amazonaws.com:3000/d-solo/ce979670-fbbf-4f27-9a17-e16d14468274/odn-ec2-grafana-test?orgId=1&from=1672498800000&to=1704034799999&panelId=4`,
      title: "annotation",
      className: "small",
    },
    {
      src: `http://ec2-15-165-102-138.ap-northeast-2.compute.amazonaws.com:3000/d-solo/ce979670-fbbf-4f27-9a17-e16d14468274/odn-ec2-grafana-test?orgId=1&from=1672498800000&to=1704034799999&panelId=2`,
      title: "odn-chart",
      className: "big",
    },
    {
      src: `http://ec2-15-165-102-138.ap-northeast-2.compute.amazonaws.com:3000/d-solo/ce979670-fbbf-4f27-9a17-e16d14468274/odn-ec2-grafana-test?orgId=1&from=1672498800000&to=1704034799999&panelId=1`,
      title: "lift-chart",
      className: "big",
    },
    {
      src: "http://ec2-15-165-102-138.ap-northeast-2.compute.amazonaws.com:3000/d-solo/ce979670-fbbf-4f27-9a17-e16d14468274/odn-ec2-grafana-test?orgId=1&from=1672498800000&to=1704034799999&panelId=5",
      title: "readme",
      className: "readme",
    },
  ];

  return (
    <div className="App">
      <div className="App-header">
        <div className="container">
          {iframeItems.map((item, index) => (
            // eslint-disable-next-line
            <iframe key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
