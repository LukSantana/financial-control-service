import sinon from 'sinon';

const resJsonStub = sinon.stub()
const resStatusStub = sinon.stub()
const resSendStub = sinon.stub()

const prismaClientStub = {
  fetchMany: sinon.stub(),
  fetchUnique: sinon.stub(),
  create: sinon.stub(),
  update: sinon.stub(),
  delete: sinon.stub(),
}

const createStubs = () => {
  resJsonStub.callsFake((data) => data)
  resStatusStub.callsFake((status) => status)
  resSendStub.callsFake((data) => data)
}

const resetStubsAndSpies = () => {
  sinon.reset()
  sinon.restore()
  resJsonStub.reset()
  resStatusStub.reset()
  resSendStub.reset()
  prismaClientStub.fetchMany.reset()
  prismaClientStub.fetchUnique.reset()
  prismaClientStub.create.reset()
  prismaClientStub.update.reset()
  prismaClientStub.delete.reset()
}

const req = {
  query: {},
  headers: {},
  body: {},
  params: {},
}

const res = {
  json: resJsonStub,
  status: resStatusStub,
  send: resSendStub,
}

const getRandomEnumValue = (enumObj: object) => {
  const enumValues = Object.values(enumObj);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};

export {
  prismaClientStub,
  createStubs,
  resetStubsAndSpies,
  req,
  resJsonStub,
  resStatusStub,
  resSendStub,
  res,
  getRandomEnumValue
}