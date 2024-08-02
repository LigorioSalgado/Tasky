import os
from datetime import datetime
from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, ListAttribute, NumberAttribute, UTCDateTimeAttribute
from pynamodb.connection import Connection


connection = Connection(
    region=os.getenv('AWS_REGION', 'us-west-2'),
    host=os.getenv('DYNAMODB_HOST', 'http://localhost:8000'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

class BaseModel(Model):
    create_date = UTCDateTimeAttribute(null=True)
    update_date = UTCDateTimeAttribute(null=True)

    def save(self, conditional_operator=None, **expected_values):
        if not self.create_date:
            self.create_date = datetime.utcnow()
        super(BaseModel, self).save(conditional_operator, **expected_values)

    def update(self, actions, conditional_operator=None, **expected_values):
        self.update_date = datetime.utcnow()
        super(BaseModel, self).update(actions, conditional_operator, **expected_values)


class Project(BaseModel):
    class Meta:
        table_name = "Projects"
        region = os.getenv('AWS_REGION', 'us-west-2')
        host = os.getenv('DYNAMODB_HOST', 'http://localhost:8000')

    PK = UnicodeAttribute(hash_key=True)
    SK = UnicodeAttribute(range_key=True)
    name = UnicodeAttribute()
    description = UnicodeAttribute(null=True)


class Column(BaseModel):
    class Meta:
        table_name = "Projects"
        region = os.getenv('AWS_REGION', 'us-west-2')
        host = os.getenv('DYNAMODB_HOST', 'http://localhost:8000')


    PK = UnicodeAttribute(hash_key=True)
    SK = UnicodeAttribute(range_key=True)
    name = UnicodeAttribute()
    order = NumberAttribute()


class Task(BaseModel):
    class Meta:
        table_name = "Projects"
        region = os.getenv('AWS_REGION', 'us-west-2')
        host = os.getenv('DYNAMODB_HOST', 'http://localhost:8000')


    PK = UnicodeAttribute(hash_key=True)
    SK = UnicodeAttribute(range_key=True)
    title = UnicodeAttribute()
    description = UnicodeAttribute(null=True)
    priority = UnicodeAttribute(null=True)
    start_date = UnicodeAttribute(null=True)
    end_date = UnicodeAttribute(null=True)
    tags = ListAttribute(of=UnicodeAttribute, default=tuple())
